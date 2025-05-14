"use client";

import { useClerkAppearanceVariables } from "@/modules/user/hooks/use-clerk-appearance-variables";
import { SignIn } from "@clerk/nextjs";

export const AuthView = () => {
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  return (
    <div className="mt-16 lg:mt-0">
      <SignIn
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
          },
        }}
      />
    </div>
  );
};
