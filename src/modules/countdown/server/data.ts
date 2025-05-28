import { db } from "@/db";
import { countdowns } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { cache } from "react";
import "server-only";

export async function createCountdown(data: {
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeklyDaysOff: number[];
  additionalDaysOff: Date[];
}) {
  const [countdown] = await db.insert(countdowns).values(data).returning();

  return countdown;
}

export async function updateCountdown(
  id: number,
  userId: string,
  updateData: {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    weeklyDaysOff?: number[];
    additionalDaysOff?: Date[];
  },
) {
  const [updatedCountdown] = await db
    .update(countdowns)
    .set(updateData)
    .where(and(eq(countdowns.id, id), eq(countdowns.userId, userId)))
    .returning();

  if (!updatedCountdown) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Unable to update countdown",
    });
  }

  return updatedCountdown;
}

export async function deleteCountdown(id: number, userId: string) {
  const [deletedCountdown] = await db
    .delete(countdowns)
    .where(and(eq(countdowns.id, id), eq(countdowns.userId, userId)))
    .returning();

  if (!deletedCountdown) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Unable to delete countdown",
    });
  }

  return { success: true };
}

export const getAllCountdowns = cache(async (userId: string) => {
  const userCountdowns = await db.query.countdowns.findMany({
    where: (countdowns, { eq }) => eq(countdowns.userId, userId),
    orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
  });

  return userCountdowns;
});

export const getCountdownById = cache(async (id: number, userId: string) => {
  const countdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq, and }) =>
      and(eq(countdowns.id, id), eq(countdowns.userId, userId)),
  });

  if (!countdown) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Countdown not found",
    });
  }

  return countdown;
});
