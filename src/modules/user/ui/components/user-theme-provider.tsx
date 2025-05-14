import { allThemes } from "@/modules/user/config/themes";
import { ThemeProvider } from "next-themes";

interface UserThemeProviderProps {
  children: React.ReactNode;
}

export const UserThemeProvider = async ({
  children,
}: UserThemeProviderProps) => {
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
