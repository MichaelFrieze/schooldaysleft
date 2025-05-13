import { allThemes } from "@/modules/user/config/themes";
import { auth } from "@clerk/nextjs/server";
import { ThemeProvider } from "next-themes";

interface UserThemeProviderProps {
  children: React.ReactNode;
}

export const UserThemeProvider = async ({
  children,
}: UserThemeProviderProps) => {
  const { sessionClaims } = await auth();
  const allThemeKeys = Object.keys(allThemes);

  let defaultTheme: string;

  const userThemeKey = sessionClaims?.userSettings?.theme;

  if (userThemeKey && allThemeKeys.includes(userThemeKey)) {
    defaultTheme = userThemeKey;
  } else {
    defaultTheme = "system";
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      themes={allThemeKeys}
    >
      {children}
    </ThemeProvider>
  );
};
