"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { allThemes, type ThemeKey } from "@/config/themes";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Home, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ClerkUserButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

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
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              height: "2rem",
              width: "2rem",
            },
            userButtonPopoverMain: {
              borderBottomLeftRadius: "0rem",
              borderBottomRightRadius: "0rem",
            },
          },
          variables: {
            ...clerkAppearanceVariables,
          },
        }}
        userProfileProps={{
          appearance: {
            variables: {
              ...clerkAppearanceVariables,
            },
            elements: {
              scrollBox: {
                borderRadius: "0rem",
              },
              navbarMobileMenuRow: {
                padding: "1rem",
              },
              navbar: {
                borderRadius: "0rem",
              },
              modalCloseButton: {
                marginTop: "0.5rem",
                marginRight: "0.5rem",
              },
            },
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Dashboard"
            href="/dashboard"
            labelIcon={<LayoutDashboard className="size-4" />}
          />
          <UserButton.Link
            label="Home"
            href="/"
            labelIcon={<Home className="size-4" />}
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    );
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: {
            height: "2rem",
            width: "2rem",
          },
          userButtonPopoverMain: {
            borderBottomLeftRadius: "0rem",
            borderBottomRightRadius: "0rem",
          },
        },
        variables: {
          ...clerkAppearanceVariables,
        },
      }}
      userProfileProps={{
        appearance: {
          variables: {
            ...clerkAppearanceVariables,
          },
          elements: {
            scrollBox: {
              borderRadius: "0rem",
            },
            navbar: {
              borderRadius: "0rem",
            },
          },
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          href="/dashboard"
          labelIcon={<LayoutDashboard className="size-4" />}
        />
        <UserButton.Link
          label="Home"
          href="/"
          labelIcon={<Home className="size-4" />}
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};
