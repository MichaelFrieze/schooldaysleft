"use client";

import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
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
      <Button variant={variant} size={size} disabled className="h-9 w-9" />
    );
  }

  const { baseKey, modeKey } = parseThemeKey(theme, resolvedTheme);

  const toggleTheme = async () => {
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
