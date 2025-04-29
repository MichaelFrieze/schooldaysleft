"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

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
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant={variant}
      className="group/toggle"
      onClick={toggleTheme}
      size={size}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
