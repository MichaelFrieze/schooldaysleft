"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export const AuthView = () => {
  const { theme } = useTheme();

  return (
    <div className="mt-16 lg:mt-0">
      <SignIn
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
          },
        }}
      />
    </div>
  );
};
