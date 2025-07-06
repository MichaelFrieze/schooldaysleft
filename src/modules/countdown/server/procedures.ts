import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { tryCatch } from "@/lib/try-catch";
import { z } from "zod";
import {
  createCountdown,
  updateCountdown,
  deleteCountdown,
  getAllCountdowns,
  getCountdownById,
} from "./data-convex";

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
      const { data: countdown, error } = await tryCatch(
        createCountdown({
          userId: ctx.session.userId,
          name: input.name,
          startDate: input.startDate,
          endDate: input.endDate,
          weeklyDaysOff: input.weeklyDaysOff,
          additionalDaysOff: input.additionalDaysOff,
        }),
      );

      if (error) {
        handleDataLayerError(error);
      }

      return { id: countdown.id };
    }),

  update: protectedProcedure
    .input(updateCountdownInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const { data: countdown, error } = await tryCatch(
        updateCountdown(id, ctx.session.userId, updateData),
      );

      if (error) {
        handleDataLayerError(error);
      }

      return { id: countdown.id };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data: result, error } = await tryCatch(
        deleteCountdown(input.id, ctx.session.userId),
      );

      if (error) {
        handleDataLayerError(error);
      }

      return result;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { data: countdowns, error } = await tryCatch(
      getAllCountdowns(ctx.session.userId),
    );

    if (error) {
      handleDataLayerError(error);
    }

    return countdowns;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: countdown, error } = await tryCatch(
        getCountdownById(input.id, ctx.session.userId),
      );

      if (error) {
        handleDataLayerError(error);
      }

      return countdown;
    }),
});

function handleDataLayerError(error: unknown): never {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";

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

  const errorConfig = errorMap[errorMessage as keyof typeof errorMap];

  if (errorConfig) {
    throw new TRPCError({
      code: errorConfig.code,
      message: errorMessage,
      cause: error,
    });
  }

  // Fallback for unmapped errors
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: errorMessage,
    cause: error,
  });
}
