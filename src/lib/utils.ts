import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseThemeKey(
  themeKey: string | undefined,
  resolvedThemeKey: string | undefined,
): { baseKey: string; modeKey: "light" | "dark" } {
  if (!themeKey || themeKey === "system") {
    return {
      baseKey: "default",
      modeKey: resolvedThemeKey === "dark" ? "dark" : "light",
    };
  }
  if (themeKey === "light" || themeKey === "dark") {
    return { baseKey: "default", modeKey: themeKey };
  }

  // Split on the last hyphen ONLY
  const lastHyphen = themeKey.lastIndexOf("-");
  if (lastHyphen === -1) {
    // If no hyphen is found, and it's not a direct 'light' or 'dark' theme, it's not a valid theme
    throw new Error(
      `Invalid theme format: "${themeKey}". Theme must be "light", "dark", "system", or in "baseName-mode" format (e.g., "claymorphism-dark").`,
    );
  }
  const baseKey = themeKey.slice(0, lastHyphen);
  const modeRaw = themeKey.slice(lastHyphen + 1);
  const modeKey: "light" | "dark" = modeRaw === "dark" ? "dark" : "light";
  return { baseKey, modeKey };
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
