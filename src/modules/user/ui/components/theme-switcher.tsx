"use client";

import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, parseThemeKey } from "@/lib/utils";
import {
  allThemes,
  themeSwitcherBaseThemes,
  type BaseTheme,
  type ThemeKey,
} from "@/modules/user/config/themes";
import { useSession } from "@clerk/nextjs";
import type { VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { setUserThemeAction } from "../../server/set-user-theme-action";

interface ThemeSwitcherProps extends VariantProps<typeof buttonVariants> {
  dropdownVariant?: VariantProps<typeof buttonVariants>["variant"];
  dropdownSize?: VariantProps<typeof buttonVariants>["size"];
}

export const ThemeSwitcher = ({
  dropdownVariant = "outline",
  dropdownSize = "default",
}: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const {
    theme: currentThemeKey,
    setTheme,
    resolvedTheme: currentResolvedThemeKey,
  } = useTheme();
  const { session, isSignedIn } = useSession();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant={dropdownVariant}
          size={dropdownSize}
          disabled
          className="h-9 w-32"
        />
      </div>
    );
  }

  const currentTheme =
    allThemes[currentResolvedThemeKey as ThemeKey] ?? allThemes.light;

  const { baseKey, modeKey } = parseThemeKey(
    currentThemeKey,
    currentResolvedThemeKey,
  );

  const handleBaseChange = async (newBase: string) => {
    const baseChange =
      newBase === "default" ? modeKey : `${newBase}-${modeKey}`;

    setTheme(baseChange);

    if (isSignedIn) {
      const { success } = await setUserThemeAction(baseChange as ThemeKey);

      if (success) {
        await session?.touch();
      }
    }
  };

  const currentBaseLabel =
    themeSwitcherBaseThemes.find((bt) => bt.value === baseKey)?.label ??
    "Select Theme";

  const getThemeColors = (
    baseTheme: BaseTheme,
    colorType: "primary" | "secondary" | "accent",
  ): string => {
    let effectiveThemeKey: ThemeKey;
    if (baseTheme.value === "default") {
      effectiveThemeKey = modeKey;
    } else {
      effectiveThemeKey = `${baseTheme.value}-${modeKey}` as ThemeKey;
    }

    const theme = allThemes[effectiveThemeKey] ?? currentTheme;

    if (colorType === "primary") {
      return theme.primary;
    }
    if (colorType === "secondary") {
      return theme.secondary;
    }
    return theme.accent;
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={dropdownVariant} size={dropdownSize}>
            <div className="flex gap-1">
              <ColorSwatch color={currentTheme.primary} size="sm" />
              <ColorSwatch color={currentTheme.secondary} size="sm" />
              <ColorSwatch color={currentTheme.accent} size="sm" />
            </div>
            {currentBaseLabel}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themeSwitcherBaseThemes.map((bt) => (
            <DropdownMenuItem
              key={bt.value}
              onClick={() => handleBaseChange(bt.value)}
            >
              <div className="flex gap-1">
                <ColorSwatch color={getThemeColors(bt, "primary")} size="sm" />
                <ColorSwatch
                  color={getThemeColors(bt, "secondary")}
                  size="sm"
                />
                <ColorSwatch color={getThemeColors(bt, "accent")} size="sm" />
              </div>
              {bt.label}
              {baseKey === bt.value && (
                <CheckIcon className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ClearLocalStorageButton = () => {
  const handleClearLocalStorage = () => {
    localStorage.clear();
  };

  return <Button onClick={handleClearLocalStorage}>Clear Local Storage</Button>;
};

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
  size?: "sm" | "md" | "lg";
}

const ColorSwatch = ({
  color,
  size = "md",
  className,
  ...props
}: ColorSwatchProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "border-border/30 flex-shrink-0 rounded-md border",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: color }}
      {...props}
    />
  );
};
