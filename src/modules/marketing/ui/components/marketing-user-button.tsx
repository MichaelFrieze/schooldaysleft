"use client";

import { UserButton, useAuth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export const MarketingUserButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: {
            height: "2.25rem",
            width: "2.25rem",
          },
        },
      }}
    />
  );
};
