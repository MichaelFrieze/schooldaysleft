"use client";

import { UserButton, useAuth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { Home, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ClerkUserButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: {
            height: "2rem",
            width: "2rem",
          },
        },
        variables: {
          colorBackground: theme === "dark" ? "#1a1a2e" : "#ffffff",
          colorNeutral: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorText: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorDanger: theme === "dark" ? "#ff5470" : "#ff5470",
          colorSuccess: theme === "dark" ? "#4db6ac" : "#4db6ac",
          colorPrimary: theme === "dark" ? "#a48fff" : "#6e56cf",
          borderRadius: "0.5rem",
          colorTextSecondary: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorTextOnPrimaryBackground:
            theme === "dark" ? "#0f0f1a" : "#ffffff",
          colorInputBackground: theme === "dark" ? "#303052" : "#e0e0f0",
          colorInputText: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
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
