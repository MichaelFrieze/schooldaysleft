import { amethystHazeDark, amethystHazeLight } from "./amethyst-haze";
import { defaultDark, defaultLight } from "./default";
import { kodamaGroveDark, kodamaGroveLight } from "./kodama-grove";
import { lavenderGlowDark, lavenderGlowLight } from "./lavender-glow";
import { modernMinimalDark, modernMinimalLight } from "./modern-minimal";
import { notebookDark, notebookLight } from "./notebook";
import { pastelDreamsDark, pastelDreamsLight } from "./pastel-dreams";
import { plumNebulaDark, plumNebulaLight } from "./plum-nebula";
import { quantumRoseDark, quantumRoseLight } from "./quantum-rose";
import { tangerineDark, tangerineLight } from "./tangerine";

export type ThemeKey =
  | "light"
  | "dark"
  | "amethyst-haze-light"
  | "amethyst-haze-dark"
  | "kodama-grove-light"
  | "kodama-grove-dark"
  | "lavender-glow-light"
  | "lavender-glow-dark"
  | "modern-minimal-light"
  | "modern-minimal-dark"
  | "notebook-light"
  | "notebook-dark"
  | "pastel-dreams-light"
  | "pastel-dreams-dark"
  | "plum-nebula-light"
  | "plum-nebula-dark"
  | "quantum-rose-light"
  | "quantum-rose-dark"
  | "tangerine-light"
  | "tangerine-dark";

export type Theme = {
  background: string;
  foreground: string;
  card: string;
  primary: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  fontSans: string;
  radius: string;
};

export const allThemes: Record<ThemeKey, Theme> = {
  light: defaultLight,
  dark: defaultDark,
  "amethyst-haze-light": amethystHazeLight,
  "amethyst-haze-dark": amethystHazeDark,
  "kodama-grove-light": kodamaGroveLight,
  "kodama-grove-dark": kodamaGroveDark,
  "lavender-glow-light": lavenderGlowLight,
  "lavender-glow-dark": lavenderGlowDark,
  "modern-minimal-light": modernMinimalLight,
  "modern-minimal-dark": modernMinimalDark,
  "notebook-light": notebookLight,
  "notebook-dark": notebookDark,
  "pastel-dreams-light": pastelDreamsLight,
  "pastel-dreams-dark": pastelDreamsDark,
  "plum-nebula-light": plumNebulaLight,
  "plum-nebula-dark": plumNebulaDark,
  "quantum-rose-light": quantumRoseLight,
  "quantum-rose-dark": quantumRoseDark,
  "tangerine-light": tangerineLight,
  "tangerine-dark": tangerineDark,
};

export interface BaseTheme {
  value: string;
  label: string;
}

const generatedBaseThemes: BaseTheme[] = Array.from(
  Object.entries(allThemes)
    .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
    .reduce((acc, [key]) => {
      let value;
      if (key.endsWith("-light")) {
        value = key.substring(0, key.length - "-light".length);
      } else if (key.endsWith("-dark")) {
        value = key.substring(0, key.length - "-dark".length);
      } else {
        // This path should ideally not be taken due to the filter
        value = key;
      }

      const label = value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      acc.set(value, { value, label });
      return acc;
    }, new Map<string, BaseTheme>())
    .values(),
);

export const themeSwitcherBaseThemes: BaseTheme[] = [
  { value: "default", label: "Default" },
  ...generatedBaseThemes,
];
