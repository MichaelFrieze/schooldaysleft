"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const AuthSignIn = () => {
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
      <Skeleton className="h-[27.5rem] w-[calc(100vw-4rem)] max-w-[25rem] rounded-lg min-[30.0625rem]:h-[23rem]" />
    );
  }

  return (
    <ClerkSignIn
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
            borderTopLeftRadius: borderRadiusLg,
            borderTopRightRadius: borderRadiusLg,
          },
          cardBox: {
            maxWidth: "25rem",
            width: "calc(100vw - 4rem)",
            borderRadius: borderRadiusLg,
            height: "27.5rem",
            "@media (min-width: 30.0625rem)": {
              height: "23rem",
            },
          },
        },
      }}
    />
  );
};
