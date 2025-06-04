import { currentUser } from "@clerk/nextjs/server";
import { cache } from "react";
import "server-only";

export const getCurrentUser = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
});
