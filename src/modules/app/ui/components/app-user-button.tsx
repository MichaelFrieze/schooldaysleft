"use client";

import { UserButton, useAuth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { Home, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

export const AppUserButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();

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
