"use client";

import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { parseThemeKey } from "@/lib/utils";
import type { ThemeKey } from "@/modules/user/config/themes";
import { useSession } from "@clerk/nextjs";
import type { VariantProps } from "class-variance-authority";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { setUserThemeAction } from "../../server/set-user-theme-action";

interface ModeToggleProps extends VariantProps<typeof buttonVariants> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ModeToggle({
  variant = "ghost",
  size = "icon",
}: ModeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { session, isSignedIn } = useSession();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} disabled className="h-9 w-9" />
    );
  }

  const { baseKey, modeKey } = parseThemeKey(theme, resolvedTheme);

  const toggleTheme = async () => {
    const newMode: "light" | "dark" = modeKey === "dark" ? "light" : "dark";
    const baseChange =
      baseKey === "default" ? newMode : `${baseKey}-${newMode}`;

    setTheme(baseChange);

    if (isSignedIn) {
      const { success, error, themeSet } = await setUserThemeAction(
        baseChange as ThemeKey,
      );
      console.log({ success, error, themeSet });

      if (success) {
        await session?.touch();
      }
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className="group/toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${modeKey === "dark" ? "light" : "dark"} mode`}
    >
      {modeKey === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
