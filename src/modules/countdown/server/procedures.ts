import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { tryCatch } from "@/lib/try-catch";
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
      const { error, data } = await tryCatch(
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
        if (error.message === "User not authenticated") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Start date must be earlier than end date") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown name is required") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message === "Weekly days off must be numbers between 0 and 6"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Weekly days off cannot contain duplicates") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Weekly days off must be in order from 0 to 6") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message === "Additional days off cannot contain duplicate dates"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message ===
          "Additional days off must be between start date and end date"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown name already exists") {
          throw new TRPCError({
            code: "CONFLICT",
            message: error.message,
            cause: error,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        });
      }

      return data;
    }),

  update: protectedProcedure
    .input(updateCountdownInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const { error, data } = await tryCatch(
        updateCountdown(id, ctx.session.userId, updateData),
      );

      if (error) {
        if (error.message === "User not authenticated") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Start date must be earlier than end date") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message === "Weekly days off must be numbers between 0 and 6"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Weekly days off cannot contain duplicates") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Weekly days off must be in order from 0 to 6") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message.includes("not found")) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: error.message,
            cause: error,
          });
        }

        if (error.message.includes("does not belong to user")) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown name is required") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message === "Additional days off cannot contain duplicate dates"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (
          error.message ===
          "Additional days off must be between start date and end date"
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown name already exists") {
          throw new TRPCError({
            code: "CONFLICT",
            message: error.message,
            cause: error,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        });
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { error, data } = await tryCatch(
        deleteCountdown(input.id, ctx.session.userId),
      );

      if (error) {
        if (error.message === "User not authenticated") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown not found") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown does not belong to user") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: error.message,
            cause: error,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        });
      }

      return data;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { error, data } = await tryCatch(
      getAllCountdowns(ctx.session.userId),
    );

    if (error) {
      if (error.message === "User not authenticated") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message,
          cause: error,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        cause: error,
      });
    }

    return data;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { error, data } = await tryCatch(
        getCountdownById(input.id, ctx.session.userId),
      );

      if (error) {
        if (error.message === "User not authenticated") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown not found") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: error.message,
            cause: error,
          });
        }

        if (error.message === "Countdown does not belong to user") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: error.message,
            cause: error,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        });
      }

      return data;
    }),
});
