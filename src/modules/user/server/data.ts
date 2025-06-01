import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { cache, experimental_taintObjectReference } from "react";
import "server-only";

export const getCurrentUser = cache(async () => {
  const user = await currentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  experimental_taintObjectReference(
    "Do not send the entire user object to the client. Instead, select only the fields you need.",
    user,
  );

  return user;
});
