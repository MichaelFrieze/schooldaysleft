"use client";

import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { parseThemeKey } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    );
  }

  const { baseKey, modeKey } = parseThemeKey(theme, resolvedTheme);

  const toggleTheme = () => {
    const newMode: "light" | "dark" = modeKey === "dark" ? "light" : "dark";
    const baseChange =
      baseKey === "default" ? newMode : `${baseKey}-${newMode}`;

    setTheme(baseChange);
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
