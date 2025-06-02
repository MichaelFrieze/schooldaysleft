import { db } from "@/db";
import { countdowns } from "@/db/schema";
import { tryCatch } from "@/lib/try-catch";
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
  const result = await tryCatch(
    db.query.countdowns.findMany({
      where: (countdowns, { eq }) => eq(countdowns.userId, userId),
      orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
    }),
  );

  if (result.error) {
    console.error("Database error fetching countdowns:", {
      userId,
      error: result.error.message,
      stack: result.error.stack,
    });

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch countdowns",
      cause: result.error,
    });
  }

  return result.data;
});

export const getCountdownById = cache(async (id: number, userId: string) => {
  const result = await tryCatch(
    db.query.countdowns.findFirst({
      where: (countdowns, { eq, and }) =>
        and(eq(countdowns.id, id), eq(countdowns.userId, userId)),
    }),
  );

  if (result.error) {
    console.error("Database error fetching countdown:", {
      id,
      userId,
      error: result.error.message,
    });

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch countdown",
      cause: result.error,
    });
  }

  if (!result.data) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Countdown not found",
    });
  }

  return result.data;
});

// When I want to use Next persistent cache:
// import { db } from "@/db";
// import { countdowns } from "@/db/schema";
// import { TRPCError } from "@trpc/server";
// import { and, eq } from "drizzle-orm";
// import { cache } from "react";
// import { unstable_cache } from "next/cache";
// import "server-only";

// export const getAllCountdowns = cache(async (userId: string) => {
//   return await unstable_cache(
//     async (userId: string) => {
//       const userCountdowns = await db.query.countdowns.findMany({
//         where: (countdowns, { eq }) => eq(countdowns.userId, userId),
//         orderBy: (countdowns, { desc }) => [desc(countdowns.createdAt)],
//       });
//       return userCountdowns;
//     },
//     [`user-countdowns-${userId}`],
//     {
//       tags: [`user-${userId}-countdowns`],
//       revalidate: 60,
//     },
//   )(userId);
// });

// export const getCountdownById = cache(async (id: number, userId: string) => {
//   return await unstable_cache(
//     async (id: number, userId: string) => {
//       const countdown = await db.query.countdowns.findFirst({
//         where: (countdowns, { eq, and }) =>
//           and(eq(countdowns.id, id), eq(countdowns.userId, userId)),
//       });

//       if (!countdown) {
//         throw new TRPCError({
//           code: "NOT_FOUND",
//           message: "Countdown not found",
//         });
//       }

//       return countdown;
//     },
//     [`countdown-${id}-${userId}`],
//     {
//       tags: [`user-${userId}-countdowns`, `countdown-${id}`],
//       revalidate: 300,
//     },
//   )(id, userId);
// });
