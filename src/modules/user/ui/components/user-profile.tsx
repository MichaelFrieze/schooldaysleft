"use client";

import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [isMounted, setIsMounted] = useState(false);
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[44rem] w-[55rem] max-w-[calc(-4rem+100vw)]" />;
  }

  if (parseFloat(clerkAppearanceVariables.borderRadius) >= parseFloat("1rem")) {
    return (
      <ClerkUserProfile
        appearance={{
          variables: {
            ...clerkAppearanceVariables,
          },
          elements: {
            cardBox: {
              maxWidth: "calc(-4rem + 100vw)",
            },
            scrollBox: {
              borderRadius: "0rem",
            },
            navbarMobileMenuRow: {
              padding: "1rem",
            },
            navbar: {
              borderRadius: "0rem",
            },
          },
        }}
      />
    );
  }

  return (
    <ClerkUserProfile
      appearance={{
        variables: {
          ...clerkAppearanceVariables,
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
