"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [isMounted, setIsMounted] = useState(false);
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  // rounded-lg in tailwind: calc(var(--radius))
  const borderRadiusLg = `calc(${clerkAppearanceVariables.borderRadius})`;

  // rounded-md in tailwind: calc(var(--radius) - 2px)
  // const borderRadiusMd = `calc(${clerkAppearanceVariables.borderRadius} - 2px)`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Skeleton className="h-[calc(100vh-8rem)] max-h-[44rem] w-[calc(100vw-4rem)] max-w-[55rem] rounded-lg" />
    );
  }

  return (
    <ClerkUserProfile
      routing="hash"
      appearance={{
        variables: {
          ...clerkAppearanceVariables,
        },
        elements: {
          cardBox: {
            width: "calc(100vw - 4rem)",
            maxWidth: "55rem",
            height: "calc(100vh - 8rem)",
            maxHeight: "44rem",
            boxShadow: "none",
            border: "none",
            borderRadius: borderRadiusLg,
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
