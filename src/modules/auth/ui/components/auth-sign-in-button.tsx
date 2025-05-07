"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const AuthSignInButton = () => {
  const { resolvedTheme } = useTheme();

  return (
    <SignInButton
      mode="modal"
      appearance={{
        variables: {
          colorBackground: resolvedTheme === "dark" ? "#1a1a2e" : "#ffffff",
          colorNeutral: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorText: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorDanger: resolvedTheme === "dark" ? "#ff5470" : "#ff5470",
          colorSuccess: resolvedTheme === "dark" ? "#4db6ac" : "#4db6ac",
          colorPrimary: resolvedTheme === "dark" ? "#a48fff" : "#6e56cf",
          borderRadius: "0.5rem",
          colorTextSecondary: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorTextOnPrimaryBackground:
            resolvedTheme === "dark" ? "#0f0f1a" : "#ffffff",
          colorInputBackground:
            resolvedTheme === "dark" ? "#303052" : "#e0e0f0",
          colorInputText: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
        },
        elements: {
          header: {
            display: "none",
          },
          main: {
            margin: "0.5rem",
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
