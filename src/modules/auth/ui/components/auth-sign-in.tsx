"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const AuthSignIn = () => {
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
      <Skeleton className="h-[23rem] w-[25rem] max-w-[calc(-4rem+100vw)]" />
    );
  }

  return (
    <ClerkSignIn
      appearance={{
        variables: {
          ...clerkAppearanceVariables,
          borderRadius,
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
          cardBox: {
            maxWidth: "calc(-4rem + 100vw)",
          },
        },
      }}
    />
  );
};
