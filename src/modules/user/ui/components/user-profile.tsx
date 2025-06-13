"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [isMounted, setIsMounted] = useState(false);
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  const borderRadiusNumber =
    parseFloat(clerkAppearanceVariables.borderRadius) / 2;
  const borderRadius = `${Math.round(borderRadiusNumber * 100) / 100}rem`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Skeleton className="h-[44rem] w-[55rem] max-w-[calc(-4rem+100vw)]" />
    );
  }

  return (
    <ClerkUserProfile
      routing="hash"
      appearance={{
        variables: {
          ...clerkAppearanceVariables,
          borderRadius,
        },
        elements: {
          cardBox: {
            maxWidth: "calc(-4rem + 100vw)",
          },
          scrollBox: {
            borderRadius: "0rem",
          },
          navbar: {
            borderRadius: "0rem",
          },
        },
      }}
    />
  );
};
