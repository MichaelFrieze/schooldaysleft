"use client";

import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const AuthSignIn = () => {
  const [isMounted, setIsMounted] = useState(false);
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[23rem] w-[25rem] max-w-[calc(-4rem+100vw)]" />;
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
          },
          cardBox: {
            maxWidth: "calc(-4rem + 100vw)",
          },
        },
      }}
    />
  );
};
