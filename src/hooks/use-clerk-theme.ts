import type { Theme, ThemeKey } from '@/lib/themes'
import { useTheme } from '@/components/providers/theme-provider'
import { themes } from '@/lib/themes'

const getClerkAppearanceVariables = (theme: Theme) => ({
  colorBackground: theme.card,
  colorNeutral: theme.foreground,
  colorText: theme.foreground,
  colorDanger: theme.destructive,
  colorPrimary: theme.primary,
  borderRadius: theme.radius,
  colorTextSecondary: theme.mutedForeground,
  colorTextOnPrimaryBackground: theme.background,
  colorInputBackground: theme.background,
  colorInputText: theme.foreground,
  colorSuccess: theme.primary,
  // colorShimmer: themeObject.border,
  colorWarning: theme.destructive,
  // fontFamily: theme.fontSans,
})

export const useClerkTheme = () => {
  const { resolvedTheme } = useTheme()
  const theme = themes[resolvedTheme as ThemeKey]

  return getClerkAppearanceVariables(theme)
}
