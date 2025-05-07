"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export const AuthView = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-16 lg:mt-0">
      <SignIn
        appearance={{
          variables: {
            colorBackground: resolvedTheme === "dark" ? "#1a1a2e" : "#ffffff",
            colorNeutral: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
            colorText: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
            colorDanger: resolvedTheme === "dark" ? "#ff5470" : "#ff5470",
            colorSuccess: resolvedTheme === "dark" ? "#4db6ac" : "#4db6ac",
            colorPrimary: resolvedTheme === "dark" ? "#a48fff" : "#6e56cf",
            borderRadius: "0.5rem",
            colorTextSecondary:
              resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
            colorTextOnPrimaryBackground:
              resolvedTheme === "dark" ? "#0f0f1a" : "#ffffff",
            colorInputBackground:
              resolvedTheme === "dark" ? "#303052" : "#e0e0f0",
            colorInputText: resolvedTheme === "dark" ? "#e2e2f5" : "#2a2a4a",
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
