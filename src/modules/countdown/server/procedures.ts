import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { tryCatch } from "@/lib/try-catch";
import { api } from "../../../../convex/_generated/api";
import { ConvexError } from "convex/values";
import type { Doc, Id } from "../../../../convex/_generated/dataModel";

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
  id: z.string(), // Convex uses string IDs
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
      const { error, data } = await tryCatch(
        ctx.convex.mutation(api.countdowns.create, {
          name: input.name,
          startDate: input.startDate.getTime(), // Convert Date to timestamp
          endDate: input.endDate.getTime(),
          weeklyDaysOff: input.weeklyDaysOff,
          additionalDaysOff: input.additionalDaysOff.map((date) =>
            date.getTime(),
          ),
        }),
      );

      if (error) {
        handleConvexError(error);
      }

      // Return an object with the ID so frontend can access it
      return { id: data };
    }),

  update: protectedProcedure
    .input(updateCountdownInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Convert dates to timestamps for Convex
      const convexUpdateData: {
        name?: string;
        startDate?: number;
        endDate?: number;
        weeklyDaysOff?: number[];
        additionalDaysOff?: number[];
      } = {};
      if (updateData.name !== undefined)
        convexUpdateData.name = updateData.name;
      if (updateData.startDate !== undefined)
        convexUpdateData.startDate = updateData.startDate.getTime();
      if (updateData.endDate !== undefined)
        convexUpdateData.endDate = updateData.endDate.getTime();
      if (updateData.weeklyDaysOff !== undefined)
        convexUpdateData.weeklyDaysOff = updateData.weeklyDaysOff;
      if (updateData.additionalDaysOff !== undefined)
        convexUpdateData.additionalDaysOff = updateData.additionalDaysOff.map(
          (date) => date.getTime(),
        );

      const { error, data } = await tryCatch(
        ctx.convex.mutation(api.countdowns.update, {
          id: id as Id<"countdowns">,
          ...convexUpdateData,
        }),
      );

      if (error) {
        handleConvexError(error);
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() })) // Changed to string for Convex
    .mutation(async ({ ctx, input }) => {
      const { error, data } = await tryCatch(
        ctx.convex.mutation(api.countdowns.remove, {
          id: input.id as Id<"countdowns">,
        }),
      );

      if (error) {
        handleConvexError(error);
      }

      return data;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { error, data } = await tryCatch(
      ctx.convex.query(api.countdowns.getAll),
    );

    if (error) {
      handleConvexError(error);
    }

    // Convert timestamps back to dates for the frontend
    return (
      data?.map((countdown: Doc<"countdowns">) => ({
        ...countdown,
        startDate: new Date(countdown.startDate),
        endDate: new Date(countdown.endDate),
        additionalDaysOff: countdown.additionalDaysOff.map(
          (timestamp: number) => new Date(timestamp),
        ),
        createdAt: new Date(countdown.createdAt),
        updatedAt: new Date(countdown.updatedAt),
      })) ?? []
    );
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() })) // Changed to string for Convex
    .query(async ({ ctx, input }) => {
      const { error, data } = await tryCatch(
        ctx.convex.query(api.countdowns.getById, {
          id: input.id as Id<"countdowns">,
        }),
      );

      if (error) {
        handleConvexError(error);
      }

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Countdown not found",
        });
      }

      // Convert timestamps back to dates for the frontend
      return {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        additionalDaysOff: data.additionalDaysOff.map(
          (timestamp: number) => new Date(timestamp),
        ),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    }),
});

function handleConvexError(error: Error): never {
  // Handle Convex errors
  if (error instanceof ConvexError) {
    const errorMap = {
      "User not authenticated": { code: "UNAUTHORIZED" as const },
      "Start date must be earlier than end date": {
        code: "BAD_REQUEST" as const,
      },
      "Countdown name is required": { code: "BAD_REQUEST" as const },
      "Weekly days off must be numbers between 0 and 6": {
        code: "BAD_REQUEST" as const,
      },
      "Weekly days off cannot contain duplicates": {
        code: "BAD_REQUEST" as const,
      },
      "Weekly days off must be in order from 0 to 6": {
        code: "BAD_REQUEST" as const,
      },
      "Additional days off cannot contain duplicate dates": {
        code: "BAD_REQUEST" as const,
      },
      "Additional days off must be between start date and end date": {
        code: "BAD_REQUEST" as const,
      },
      "Countdown name already exists": { code: "CONFLICT" as const },
      "Countdown not found": { code: "NOT_FOUND" as const },
      "Countdown does not belong to user": { code: "FORBIDDEN" as const },
    };

    const errorConfig = errorMap[error.message as keyof typeof errorMap];

    if (errorConfig) {
      throw new TRPCError({
        code: errorConfig.code,
        message: error.message,
        cause: error,
      });
    }
  }

  // Fallback for unmapped errors
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: error.message,
    cause: error,
  });
}
