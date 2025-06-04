import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { tryCatch } from "@/lib/try-catch";
import { getCurrentUser } from "./data";

export const userRouter = createTRPCRouter({
  getUserButtonData: protectedProcedure.query(async ({}) => {
    const { error, data: currentUser } = await tryCatch(getCurrentUser());

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

    const userEmail = currentUser.primaryEmailAddress?.emailAddress;
    const userImage = currentUser.imageUrl;
    const userFullName = currentUser.fullName;

    return {
      userEmail,
      userImage,
      userFullName,
    };
  }),
});
