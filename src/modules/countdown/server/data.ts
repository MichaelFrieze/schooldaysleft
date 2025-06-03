import { db } from "@/db";
import { countdowns } from "@/db/schema";
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
    throw new Error(
      "Unable to update countdown - countdown not found or access denied",
    );
  }

  return updatedCountdown;
}

export async function deleteCountdown(id: number, userId: string) {
  const [deletedCountdown] = await db
    .delete(countdowns)
    .where(and(eq(countdowns.id, id), eq(countdowns.userId, userId)))
    .returning();

  if (!deletedCountdown) {
    throw new Error(
      "Unable to delete countdown - countdown not found or access denied",
    );
  }

  return { success: true };
}

export const getAllCountdowns = cache(async (userId: string) => {
  const userCountdowns = await db.query.countdowns.findMany({
    where: (countdowns, { eq }) => eq(countdowns.userId, userId),
    orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
  });

  if (!userCountdowns) {
    throw new Error(
      "Unable to get all countdowns - no countdowns found or access denied",
    );
  }

  return userCountdowns;
});

export const getCountdownById = cache(async (id: number, userId: string) => {
  const countdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq, and }) =>
      and(eq(countdowns.id, id), eq(countdowns.userId, userId)),
  });

  if (!countdown) {
    throw new Error(
      "Unable to get countdown by id - countdown not found or access denied",
    );
  }

  return countdown;
});
