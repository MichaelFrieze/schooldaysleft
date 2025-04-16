"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme") === "dark";
      } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    }
    return false;
  });

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "theme-light");
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
