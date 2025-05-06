"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const AuthSignInButton = () => {
  const { theme } = useTheme();

  return (
    <SignInButton
      mode="modal"
      appearance={{
        variables: {
          colorBackground: theme === "dark" ? "#1a1a2e" : "#ffffff",
          colorNeutral: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorText: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorDanger: theme === "dark" ? "#ff5470" : "#ff5470",
          colorSuccess: theme === "dark" ? "#4db6ac" : "#4db6ac",
          colorPrimary: theme === "dark" ? "#a48fff" : "#6e56cf",
          borderRadius: "0.5rem",
          colorTextSecondary: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorTextOnPrimaryBackground:
            theme === "dark" ? "#0f0f1a" : "#ffffff",
          colorInputBackground: theme === "dark" ? "#303052" : "#e0e0f0",
          colorInputText: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
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
