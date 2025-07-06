import { env } from "@/env";
import { tryCatch } from "@/lib/try-catch";
import { ConvexHttpClient } from "convex/browser";

type Session = {
  userId: string;
  getToken: (options?: { template?: string }) => Promise<string | null>;
};

export async function getConvexHttpClient(session: Session) {
  const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);

  const { data: token, error } = await tryCatch(
    session.getToken({ template: "convex" }),
  );

  if (error) {
    throw new Error("Failed to get Convex auth token from session.");
  }

  if (token) {
    convex.setAuth(token);
  } else {
    throw new Error("No Convex token received from session.");
  }

  return convex;
}
