import { allThemes, type ThemeKey } from "@/modules/user/config/themes";
import { useTheme } from "next-themes";

export const useClerkAppearanceVariables = () => {
  const { resolvedTheme } = useTheme();

  const themeKey = resolvedTheme;
  const themeObject = allThemes[themeKey as ThemeKey] ?? allThemes.light;

  const clerkAppearanceVariables = {
    colorBackground: themeObject.card,
    colorNeutral: themeObject.foreground,
    colorText: themeObject.foreground,
    colorDanger: themeObject.destructive,
    colorPrimary: themeObject.primary,
    borderRadius: themeObject.radius,
    colorTextSecondary: themeObject.mutedForeground,
    colorTextOnPrimaryBackground: themeObject.background,
    colorInputBackground: themeObject.background,
    colorInputText: themeObject.foreground,
    colorSuccess: themeObject.primary,
    // colorShimmer: themeObject.border,
    colorWarning: themeObject.destructive,
    fontFamily: themeObject.fontSans,
  };

  return clerkAppearanceVariables;
};
