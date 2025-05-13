import { amberMinimalDark, amberMinimalLight } from "./amber-minimal";
import { amethystHazeDark, amethystHazeLight } from "./amethyst-haze";
import { blackAndWhiteDark, blackAndWhiteLight } from "./black-and-white";
import { chirpDark, chirpLight } from "./chirp";
import { defaultDark, defaultLight } from "./default";
import { modernMinimalDark, modernMinimalLight } from "./modern-minimal";
import { notebookDark, notebookLight } from "./notebook";
import { pastelDreamsDark, pastelDreamsLight } from "./pastel-dreams";
import { plumNebulaDark, plumNebulaLight } from "./plum-nebula";

export type ThemeKey =
  | "light"
  | "dark"
  | "amber-minimal-light"
  | "amber-minimal-dark"
  | "amethyst-haze-light"
  | "amethyst-haze-dark"
  | "black-and-white-light"
  | "black-and-white-dark"
  | "chirp-light"
  | "chirp-dark"
  | "modern-minimal-light"
  | "modern-minimal-dark"
  | "notebook-light"
  | "notebook-dark"
  | "pastel-dreams-light"
  | "pastel-dreams-dark"
  | "plum-nebula-light"
  | "plum-nebula-dark";

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
  "amber-minimal-light": amberMinimalLight,
  "amber-minimal-dark": amberMinimalDark,
  "amethyst-haze-light": amethystHazeLight,
  "amethyst-haze-dark": amethystHazeDark,
  "black-and-white-light": blackAndWhiteLight,
  "black-and-white-dark": blackAndWhiteDark,
  "chirp-light": chirpLight,
  "chirp-dark": chirpDark,
  "modern-minimal-light": modernMinimalLight,
  "modern-minimal-dark": modernMinimalDark,
  "notebook-light": notebookLight,
  "notebook-dark": notebookDark,
  "pastel-dreams-light": pastelDreamsLight,
  "pastel-dreams-dark": pastelDreamsDark,
  "plum-nebula-light": plumNebulaLight,
  "plum-nebula-dark": plumNebulaDark,
};

export interface BaseTheme {
  value: string;
  label: string;
}

const generatedBaseThemes: BaseTheme[] = Array.from(
  Object.entries(allThemes)
    .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
    .reduce((acc, [key]) => {
      const value = key.replace(/-light|-dark$/, "");
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
