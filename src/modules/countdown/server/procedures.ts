import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";

import { countdowns } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

const createCountdownInput = z.object({
  name: z
    .string()
    .min(1, "Countdown name is required")
    .max(100, "Countdown name must be less than 100 characters")
    .trim(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  weeklyDaysOff: z
    .array(z.number().int().min(0).max(6))
    .default([])
    .refine(
      (days) => new Set(days).size === days.length,
      "Weekly days off cannot contain duplicates",
    ),
  additionalDaysOff: z.array(z.coerce.date()).default([]),
});

const updateCountdownInput = z.object({
  id: z.number(),
  name: z.string().min(1).max(150).trim().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  weeklyDaysOff: z.array(z.number().int().min(0).max(6)).optional(),
  additionalDaysOff: z.array(z.coerce.date()).optional(),
});

export const countdownRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCountdownInput)
    .mutation(async ({ ctx, input }) => {
      // Validate dates
      if (input.startDate >= input.endDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        });
      }

      const [countdown] = await ctx.db
        .insert(countdowns)
        .values({
          userId: ctx.session.userId,
          name: input.name,
          startDate: input.startDate,
          endDate: input.endDate,
          weeklyDaysOff: input.weeklyDaysOff,
          additionalDaysOff: input.additionalDaysOff,
        })
        .returning();

      return countdown;
    }),

  update: protectedProcedure
    .input(updateCountdownInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      if (
        updateData.startDate &&
        updateData.endDate &&
        updateData.startDate >= updateData.endDate
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        });
      }

      const [updatedCountdown] = await ctx.db
        .update(countdowns)
        .set(updateData)
        .where(
          and(eq(countdowns.id, id), eq(countdowns.userId, ctx.session.userId)),
        )
        .returning();

      if (!updatedCountdown) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to update countdown",
        });
      }

      return updatedCountdown;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const [deletedCountdown] = await ctx.db
        .delete(countdowns)
        .where(
          and(
            eq(countdowns.id, input.id),
            eq(countdowns.userId, ctx.session.userId),
          ),
        )
        .returning();

      if (!deletedCountdown) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to delete countdown",
        });
      }

      return { success: true };
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userCountdowns = await ctx.db.query.countdowns.findMany({
      where: (countdowns, { eq }) => eq(countdowns.userId, ctx.session.userId),
      orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
    });

    return userCountdowns;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const countdown = await ctx.db.query.countdowns.findFirst({
        where: (countdowns, { eq, and }) =>
          and(
            eq(countdowns.id, input.id),
            eq(countdowns.userId, ctx.session.userId),
          ),
      });

      if (!countdown) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Countdown not found",
        });
      }

      return countdown;
    }),
});
