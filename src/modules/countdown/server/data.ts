import { db } from "@/db";
import { countdowns } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
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
  const { userId: clerkUserId } = await auth();

  if (data.userId !== clerkUserId) {
    throw new Error("User not authenticated");
  }

  if (data.startDate >= data.endDate) {
    throw new Error("Start date must be earlier than end date");
  }

  if (!data.name || data.name.trim() === "") {
    throw new Error("Countdown name is required");
  }

  if (data.weeklyDaysOff.length > 0) {
    const invalidDays = data.weeklyDaysOff.filter((day) => day < 0 || day > 6);
    if (invalidDays.length > 0) {
      throw new Error("Weekly days off must be numbers between 0 and 6");
    }

    const uniqueDays = new Set(data.weeklyDaysOff);
    if (uniqueDays.size !== data.weeklyDaysOff.length) {
      throw new Error("Weekly days off cannot contain duplicates");
    }

    const sortedDays = [...data.weeklyDaysOff].sort((a, b) => a - b);
    const isInOrder = data.weeklyDaysOff.every(
      (day, index) => day === sortedDays[index],
    );
    if (!isInOrder) {
      throw new Error("Weekly days off must be in order from 0 to 6");
    }
  }

  if (data.additionalDaysOff.length > 0) {
    const dateStrings = data.additionalDaysOff.map(
      (date) => date.toISOString().split("T")[0],
    );
    const uniqueDateStrings = new Set(dateStrings);
    if (uniqueDateStrings.size !== dateStrings.length) {
      throw new Error("Additional days off cannot contain duplicate dates");
    }

    const datesOutsideRange = data.additionalDaysOff.filter(
      (date) => date < data.startDate || date > data.endDate,
    );
    if (datesOutsideRange.length > 0) {
      throw new Error(
        "Additional days off must be between start date and end date",
      );
    }
  }

  const existingCountdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq, and }) =>
      and(eq(countdowns.userId, data.userId), eq(countdowns.name, data.name)),
  });

  if (existingCountdown) {
    throw new Error("Countdown name already exists");
  }

  const [countdown] = await db.insert(countdowns).values(data).returning();

  if (!countdown) {
    throw new Error("Unable to create countdown");
  }

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
  const { userId: clerkUserId } = await auth();

  if (userId !== clerkUserId) {
    throw new Error("User not authenticated");
  }

  if (updateData.weeklyDaysOff && updateData.weeklyDaysOff.length > 0) {
    const invalidDays = updateData.weeklyDaysOff.filter(
      (day) => day < 0 || day > 6,
    );
    if (invalidDays.length > 0) {
      throw new Error("Weekly days off must be numbers between 0 and 6");
    }

    const uniqueDays = new Set(updateData.weeklyDaysOff);
    if (uniqueDays.size !== updateData.weeklyDaysOff.length) {
      throw new Error("Weekly days off cannot contain duplicates");
    }

    const sortedDays = [...updateData.weeklyDaysOff].sort((a, b) => a - b);
    const isInOrder = updateData.weeklyDaysOff.every(
      (day, index) => day === sortedDays[index],
    );
    if (!isInOrder) {
      throw new Error("Weekly days off must be in order from 0 to 6");
    }
  }

  const existingCountdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq }) => eq(countdowns.id, id),
  });

  if (!existingCountdown) {
    throw new Error("Countdown not found");
  }

  if (existingCountdown.userId !== userId) {
    throw new Error("Countdown does not belong to user");
  }

  const effectiveStartDate =
    updateData.startDate ?? existingCountdown.startDate;
  const effectiveEndDate = updateData.endDate ?? existingCountdown.endDate;

  if (effectiveStartDate >= effectiveEndDate) {
    throw new Error("Start date must be earlier than end date");
  }

  if (updateData.name?.trim() === "") {
    throw new Error("Countdown name is required");
  }

  if (updateData.additionalDaysOff && updateData.additionalDaysOff.length > 0) {
    const dateStrings = updateData.additionalDaysOff.map(
      (date) => date.toISOString().split("T")[0],
    );

    const uniqueDateStrings = new Set(dateStrings);
    if (uniqueDateStrings.size !== dateStrings.length) {
      throw new Error("Additional days off cannot contain duplicate dates");
    }

    const datesOutsideRange = updateData.additionalDaysOff.filter((date) => {
      const startDateToCheck =
        updateData.startDate ?? existingCountdown.startDate;
      const endDateToCheck = updateData.endDate ?? existingCountdown.endDate;

      return date < startDateToCheck || date > endDateToCheck;
    });

    if (datesOutsideRange.length > 0) {
      throw new Error(
        "Additional days off must be between start date and end date",
      );
    }
  }

  if (updateData.name && updateData.name !== existingCountdown.name) {
    const newName = updateData.name;

    const duplicateCountdown = await db.query.countdowns.findFirst({
      where: (countdowns, { eq, and, ne }) =>
        and(
          eq(countdowns.userId, userId),
          eq(countdowns.name, newName),
          ne(countdowns.id, id),
        ),
    });

    if (duplicateCountdown) {
      throw new Error("Countdown name already exists");
    }
  }

  const [updatedCountdown] = await db
    .update(countdowns)
    .set(updateData)
    .where(and(eq(countdowns.id, id), eq(countdowns.userId, userId)))
    .returning();

  if (!updatedCountdown) {
    throw new Error("Unable to update countdown");
  }

  return updatedCountdown;
}

export async function deleteCountdown(id: number, userId: string) {
  const { userId: clerkUserId } = await auth();

  if (userId !== clerkUserId) {
    throw new Error("User not authenticated");
  }

  const existingCountdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq }) => eq(countdowns.id, id),
  });

  if (!existingCountdown) {
    throw new Error("Countdown not found");
  }

  if (existingCountdown.userId !== userId) {
    throw new Error("Countdown does not belong to user");
  }

  const [deletedCountdown] = await db
    .delete(countdowns)
    .where(and(eq(countdowns.id, id), eq(countdowns.userId, userId)))
    .returning();

  if (!deletedCountdown) {
    throw new Error("Unable to delete countdown");
  }

  return { success: true };
}

export const getAllCountdowns = cache(async (userId: string) => {
  const { userId: clerkUserId } = await auth();

  if (userId !== clerkUserId) {
    throw new Error("User not authenticated");
  }

  const userCountdowns = await db.query.countdowns.findMany({
    where: (countdowns, { eq }) => eq(countdowns.userId, userId),
    orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
  });

  if (!userCountdowns) {
    throw new Error("Unable to get all countdowns");
  }

  return userCountdowns;
});

export const getCountdownById = cache(async (id: number, userId: string) => {
  const { userId: clerkUserId } = await auth();

  if (userId !== clerkUserId) {
    throw new Error("User not authenticated");
  }

  const countdown = await db.query.countdowns.findFirst({
    where: (countdowns, { eq }) => eq(countdowns.id, id),
  });

  if (!countdown) {
    throw new Error("Countdown not found");
  }

  if (countdown.userId !== userId) {
    throw new Error("Countdown does not belong to user");
  }

  return countdown;
});
