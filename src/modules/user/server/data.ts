import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { cache } from "react";
import "server-only";

export const getCurrentUser = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return user;
});
