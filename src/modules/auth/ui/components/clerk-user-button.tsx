"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Home, LayoutDashboard, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export const ClerkUserButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

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
            label="Settings"
            href="/settings"
            labelIcon={<Settings className="size-4" />}
          />
          <UserButton.Action label="manageAccount" />
          <UserButton.Link
            label="Home"
            href="/home"
            labelIcon={<Home className="size-4" />}
          />
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
          label="Settings"
          href="/settings"
          labelIcon={<Settings className="size-4" />}
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Link
          label="Home"
          href="/home"
          labelIcon={<Home className="size-4" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};
