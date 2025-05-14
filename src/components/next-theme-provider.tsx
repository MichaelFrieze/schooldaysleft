import { allThemes } from "@/modules/settings/config/themes";
import { ThemeProvider } from "next-themes";

interface NextThemeProviderProps {
  children: React.ReactNode;
}

export const NextThemeProvider = async ({
  children,
}: NextThemeProviderProps) => {
  const allThemeKeys = Object.keys(allThemes);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={"system"}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      themes={allThemeKeys}
    >
      {children}
    </ThemeProvider>
  );
};
