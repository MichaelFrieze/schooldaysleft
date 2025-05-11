"use client";

import { allThemes, type ThemeKey } from "@/config/themes";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export const AuthView = () => {
  const { resolvedTheme } = useTheme();

  const themeKey = resolvedTheme;
  const themeObject = allThemes[themeKey as ThemeKey] ?? allThemes.light;

  const clerkAppearanceVariables = {
    colorBackground: themeObject.card,
    colorNeutral: themeObject.foreground,
    colorText: themeObject.foreground,
    colorDanger: themeObject.destructive,
    colorPrimary: themeObject.primary,
    borderRadius: themeObject.radius,
    colorTextSecondary: themeObject.mutedForeground,
    colorTextOnPrimaryBackground: themeObject.foreground,
    colorInputBackground: themeObject.input,
    colorInputText: themeObject.foreground,
    colorSuccess: themeObject.primary,
    // colorShimmer: themeObject.border,
    colorWarning: themeObject.destructive,
    fontFamily: themeObject.fontSans,
  };

  return (
    <div className="mt-16 lg:mt-0">
      <SignIn
        appearance={{
          variables: {
            ...clerkAppearanceVariables,
          },
          layout: {
            socialButtonsVariant: "blockButton",
          },
          elements: {
            header: {
              display: "none",
            },
            main: {
              margin: "0.5rem",
            },
            card: {
              borderBottomLeftRadius: "0rem",
              borderBottomRightRadius: "0rem",
            },
          },
        }}
      />
    </div>
  );
};
