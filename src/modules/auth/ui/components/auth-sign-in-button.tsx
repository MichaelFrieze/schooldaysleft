"use client";

import { Button } from "@/components/ui/button";
import { useClerkAppearanceVariables } from "@/modules/settings/hooks/use-clerk-appearance-variables";
import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export const AuthSignInButton = () => {
  const clerkAppearanceVariables = useClerkAppearanceVariables();

  if (parseFloat(clerkAppearanceVariables.borderRadius) >= parseFloat("1rem")) {
    return (
      <SignInButton
        mode="modal"
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
            modalCloseButton: {
              marginTop: "0.2rem",
              marginRight: "0.3rem",
            },
            card: {
              borderBottomLeftRadius: "0rem",
              borderBottomRightRadius: "0rem",
            },
          },
        }}
      >
        <Button
          variant="default"
          className="h-8 rounded-full text-sm font-medium shadow-none"
        >
          <UserCircleIcon />
          Sign in
        </Button>
      </SignInButton>
    );
  }

  return (
    <SignInButton
      mode="modal"
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
    >
      <Button
        variant="default"
        className="h-8 rounded-full text-sm font-medium shadow-none"
      >
        <UserCircleIcon />
        Sign in
      </Button>
    </SignInButton>
  );
};
