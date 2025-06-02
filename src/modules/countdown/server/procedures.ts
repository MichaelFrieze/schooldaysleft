import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createCountdown,
  deleteCountdown,
  getAllCountdowns,
  getCountdownById,
  updateCountdown,
} from "./data";

const createCountdownInput = z.object({
  name: z
    .string()
    .min(1, "Countdown name is required")
    .max(60, "Countdown name must be less than 60 characters")
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
  name: z
    .string()
    .min(1, "Countdown name is required")
    .max(60, "Countdown name must be less than 60 characters")
    .trim()
    .optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  weeklyDaysOff: z
    .array(z.number().int().min(0).max(6))
    .refine(
      (days) => new Set(days).size === days.length,
      "Weekly days off cannot contain duplicates",
    )
    .optional(),
  additionalDaysOff: z.array(z.coerce.date()).optional(),
});

export const countdownRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCountdownInput)
    .mutation(async ({ ctx, input }) => {
      if (input.startDate >= input.endDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        });
      }

      return await createCountdown({
        userId: ctx.session.userId,
        name: input.name,
        startDate: input.startDate,
        endDate: input.endDate,
        weeklyDaysOff: input.weeklyDaysOff,
        additionalDaysOff: input.additionalDaysOff,
      });
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

      return await updateCountdown(id, ctx.session.userId, updateData);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await deleteCountdown(input.id, ctx.session.userId);
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await getAllCountdowns(ctx.session.userId);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await getCountdownById(input.id, ctx.session.userId);
    }),
});
