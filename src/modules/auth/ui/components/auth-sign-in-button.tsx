"use client";

import { Button } from "@/components/ui/button";
import { allThemes, type ThemeKey } from "@/config/themes";
import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const AuthSignInButton = () => {
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

  if (parseFloat(clerkAppearanceVariables.borderRadius) >= parseFloat("1rem")) {
    return (
      <SignInButton
        mode="modal"
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
            modalCloseButton: {
              marginTop: "0.2rem",
              marginRight: "0.3rem",
            },
            card: {
              borderBottomLeftRadius: "0rem",
              borderBottomRightRadius: "0rem",
            },
          },
        }}
      >
        <Button
          variant="default"
          className="h-8 rounded-full text-sm font-medium shadow-none"
        >
          <UserCircleIcon />
          Sign in
        </Button>
      </SignInButton>
    );
  }

  return (
    <SignInButton
      mode="modal"
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
    >
      <Button
        variant="default"
        className="h-8 rounded-full text-sm font-medium shadow-none"
      >
        <UserCircleIcon />
        Sign in
      </Button>
    </SignInButton>
  );
};
