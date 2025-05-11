"use server";

import type { ThemeKey } from "@/config/themes";
import { allThemes } from "@/config/themes";
import { tryCatch } from "@/lib/try-catch";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const ThemeKeySchema = z.enum(
  Object.keys(allThemes) as [ThemeKey, ...ThemeKey[]],
);

export async function setUserThemeAction(themeKey: ThemeKey) {
  const { userId } = await auth();

  if (!userId) {
    console.error("User not authenticated to set theme.");
    return { success: false, error: "User not authenticated." };
  }

  const validationResult = ThemeKeySchema.safeParse(themeKey);

  if (!validationResult.success) {
    console.error("Invalid theme name provided:", validationResult.error);
    return { success: false, error: "Invalid theme name." };
  }

  const validatedThemeKey = validationResult.data;

  const client = await clerkClient();

  const { error } = await tryCatch(
    client.users.updateUserMetadata(userId, {
      publicMetadata: {
        theme: validatedThemeKey,
      },
    }),
  );

  if (error) {
    console.error("Failed to update user theme:", error);
    return {
      success: false,
      error: "Server action failed to update Clerk user metadata with theme.",
    };
  }

  return { success: true, themeSet: validatedThemeKey };
}
