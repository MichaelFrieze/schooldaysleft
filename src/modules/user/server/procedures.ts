import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getCurrentUser } from "./data";

export const userRouter = createTRPCRouter({
  getUserButtonData: protectedProcedure.query(async ({}) => {
    const currentUser = await getCurrentUser();

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
