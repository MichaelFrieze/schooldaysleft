import { getConvexHttpClient } from "@/lib/convex-http-client";
import { tryCatch } from "@/lib/try-catch";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import "server-only";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

// type ConvexCountdown = {
//   _id: Id<"countdowns">;
//   userId: string;
//   name: string;
//   startDate: number;
//   endDate: number;
//   weeklyDaysOff: number[];
//   additionalDaysOff: number[];
//   createdAt: number;
//   updatedAt: number;
// };

// Helper to convert Date to timestamp and vice versa
function dateToTimestamp(date: Date): number {
  return date.getTime();
}

function timestampToDate(timestamp: number): Date {
  return new Date(timestamp);
}

export async function createCountdown(data: {
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeklyDaysOff: number[];
  additionalDaysOff: Date[];
}) {
  const session = await auth();

  if (data.userId !== session?.userId) {
    throw new Error("User not authenticated");
  }

  const convex = await getConvexHttpClient(session);

  const { data: countdownId, error } = await tryCatch(
    convex.mutation(api.countdowns.create, {
      name: data.name,
      startDate: dateToTimestamp(data.startDate),
      endDate: dateToTimestamp(data.endDate),
      weeklyDaysOff: data.weeklyDaysOff,
      additionalDaysOff: data.additionalDaysOff.map(dateToTimestamp),
    }),
  );

  if (error) {
    throw error;
  }

  if (!countdownId) {
    throw new Error("Unable to create countdown");
  }

  const { data: countdown, error: getError } = await tryCatch(
    convex.query(api.countdowns.getById, { id: countdownId }),
  );

  if (getError || !countdown) {
    throw new Error("Unable to retrieve created countdown");
  }

  return {
    id: countdown._id,
    userId: countdown.userId,
    name: countdown.name,
    startDate: timestampToDate(countdown.startDate),
    endDate: timestampToDate(countdown.endDate),
    weeklyDaysOff: countdown.weeklyDaysOff,
    additionalDaysOff: countdown.additionalDaysOff.map(timestampToDate),
    createdAt: timestampToDate(countdown.createdAt),
    updatedAt: timestampToDate(countdown.updatedAt),
  };
}

export async function updateCountdown(
  id: string,
  userId: string,
  updateData: {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    weeklyDaysOff?: number[];
    additionalDaysOff?: Date[];
  },
) {
  const session = await auth();

  if (userId !== session?.userId) {
    throw new Error("User not authenticated");
  }

  const convex = await getConvexHttpClient(session);

  const convexUpdateData: {
    name?: string;
    startDate?: number;
    endDate?: number;
    weeklyDaysOff?: number[];
    additionalDaysOff?: number[];
  } = {};

  if (updateData.name !== undefined) convexUpdateData.name = updateData.name;
  if (updateData.startDate !== undefined)
    convexUpdateData.startDate = dateToTimestamp(updateData.startDate);
  if (updateData.endDate !== undefined)
    convexUpdateData.endDate = dateToTimestamp(updateData.endDate);
  if (updateData.weeklyDaysOff !== undefined)
    convexUpdateData.weeklyDaysOff = updateData.weeklyDaysOff;
  if (updateData.additionalDaysOff !== undefined)
    convexUpdateData.additionalDaysOff =
      updateData.additionalDaysOff.map(dateToTimestamp);

  const { data: updatedId, error } = await tryCatch(
    convex.mutation(api.countdowns.update, {
      id: id as Id<"countdowns">,
      ...convexUpdateData,
    }),
  );

  if (error) {
    throw error;
  }

  if (!updatedId) {
    throw new Error("Unable to update countdown");
  }

  const { data: countdown, error: getError } = await tryCatch(
    convex.query(api.countdowns.getById, { id: updatedId }),
  );

  if (getError || !countdown) {
    throw new Error("Unable to retrieve updated countdown");
  }

  return {
    id: countdown._id,
    userId: countdown.userId,
    name: countdown.name,
    startDate: timestampToDate(countdown.startDate),
    endDate: timestampToDate(countdown.endDate),
    weeklyDaysOff: countdown.weeklyDaysOff,
    additionalDaysOff: countdown.additionalDaysOff.map(timestampToDate),
    createdAt: timestampToDate(countdown.createdAt),
    updatedAt: timestampToDate(countdown.updatedAt),
  };
}

export async function deleteCountdown(id: string, userId: string) {
  const session = await auth();

  if (userId !== session?.userId) {
    throw new Error("User not authenticated");
  }

  const convex = await getConvexHttpClient(session);

  const { data: result, error } = await tryCatch(
    convex.mutation(api.countdowns.remove, {
      id: id as Id<"countdowns">,
    }),
  );

  if (error) {
    throw error;
  }

  if (!result?.success) {
    throw new Error("Unable to delete countdown");
  }

  return { success: true };
}

export const getAllCountdowns = cache(async (userId: string) => {
  const session = await auth();

  if (userId !== session?.userId) {
    throw new Error("User not authenticated");
  }

  const convex = await getConvexHttpClient(session);

  const { data: countdowns, error } = await tryCatch(
    convex.query(api.countdowns.getAll),
  );

  if (error) {
    throw error;
  }

  if (!countdowns) {
    throw new Error("Unable to get all countdowns");
  }

  return countdowns.map((countdown) => ({
    id: countdown._id,
    userId: countdown.userId,
    name: countdown.name,
    startDate: timestampToDate(countdown.startDate),
    endDate: timestampToDate(countdown.endDate),
    weeklyDaysOff: countdown.weeklyDaysOff,
    additionalDaysOff: countdown.additionalDaysOff.map(timestampToDate),
    createdAt: timestampToDate(countdown.createdAt),
    updatedAt: timestampToDate(countdown.updatedAt),
  }));
});

export const getCountdownById = cache(async (id: string, userId: string) => {
  const session = await auth();

  if (userId !== session?.userId) {
    throw new Error("User not authenticated");
  }

  const convex = await getConvexHttpClient(session);

  const { data: countdown, error } = await tryCatch(
    convex.query(api.countdowns.getById, { id: id as Id<"countdowns"> }),
  );

  if (error) {
    throw error;
  }

  if (!countdown) {
    throw new Error("Countdown not found");
  }

  if (countdown.userId !== userId) {
    throw new Error("Countdown does not belong to user");
  }

  return {
    id: countdown._id,
    userId: countdown.userId,
    name: countdown.name,
    startDate: timestampToDate(countdown.startDate),
    endDate: timestampToDate(countdown.endDate),
    weeklyDaysOff: countdown.weeklyDaysOff,
    additionalDaysOff: countdown.additionalDaysOff.map(timestampToDate),
    createdAt: timestampToDate(countdown.createdAt),
    updatedAt: timestampToDate(countdown.updatedAt),
  };
});
