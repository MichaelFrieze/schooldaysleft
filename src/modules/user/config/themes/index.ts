import { amberMinimalDark, amberMinimalLight } from "./amber-minimal";
import { amethystHazeDark, amethystHazeLight } from "./amethyst-haze";
import { blackAndWhiteDark, blackAndWhiteLight } from "./black-and-white";
import { chirpDark, chirpLight } from "./chirp";
import { defaultDark, defaultLight } from "./default";
import { kodamaGroveDark, kodamaGroveLight } from "./kodama-grove";
import { lavenderGlowDark, lavenderGlowLight } from "./lavender-glow";
import { modernMinimalDark, modernMinimalLight } from "./modern-minimal";
import { northernLightsDark, northernLightsLight } from "./northern-lights";
import { notebookDark, notebookLight } from "./notebook";
import { oceanBreezeDark, oceanBreezeLight } from "./ocean-breeze";
import { pastelDreamsDark, pastelDreamsLight } from "./pastel-dreams";
import { plumNebulaDark, plumNebulaLight } from "./plum-nebula";
import { quantumRoseDark, quantumRoseLight } from "./quantum-rose";
import { tangerineDark, tangerineLight } from "./tangerine";

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
  | "kodama-grove-light"
  | "kodama-grove-dark"
  | "lavender-glow-light"
  | "lavender-glow-dark"
  | "modern-minimal-light"
  | "modern-minimal-dark"
  | "northern-lights-light"
  | "northern-lights-dark"
  | "notebook-light"
  | "notebook-dark"
  | "ocean-breeze-light"
  | "ocean-breeze-dark"
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
  "amber-minimal-light": amberMinimalLight,
  "amber-minimal-dark": amberMinimalDark,
  "amethyst-haze-light": amethystHazeLight,
  "amethyst-haze-dark": amethystHazeDark,
  "black-and-white-light": blackAndWhiteLight,
  "black-and-white-dark": blackAndWhiteDark,
  "chirp-light": chirpLight,
  "chirp-dark": chirpDark,
  "kodama-grove-light": kodamaGroveLight,
  "kodama-grove-dark": kodamaGroveDark,
  "lavender-glow-light": lavenderGlowLight,
  "lavender-glow-dark": lavenderGlowDark,
  "modern-minimal-light": modernMinimalLight,
  "modern-minimal-dark": modernMinimalDark,
  "northern-lights-light": northernLightsLight,
  "northern-lights-dark": northernLightsDark,
  "notebook-light": notebookLight,
  "notebook-dark": notebookDark,
  "ocean-breeze-light": oceanBreezeLight,
  "ocean-breeze-dark": oceanBreezeDark,
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

// Using Regex to remove the -light or -dark suffix and this one is not working with the northern-lights theme. It's producing northerns-light and northerns-dark.
// const generatedBaseThemes: BaseTheme[] = Array.from(
//   Object.entries(allThemes)
//     .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
//     .reduce((acc, [key]) => {
//       const value = key.replace(/-light|-dark$/, "");
//       const label = value
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");

//       acc.set(value, { value, label });
//       return acc;
//     }, new Map<string, BaseTheme>())
//     .values(),
// );

// ================================
// ================================

// This is an attempt to log out the issue with the northern-lights theme to the console.
// const generatedBaseThemes: BaseTheme[] = Array.from(
//   Object.entries(allThemes)
//     .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
//     .reduce((acc, [key]) => {
//       // --- START DEBUG LOGGING ---
//       if (key.includes("northern") || key.includes("northerns")) {
//         console.log("------------------------------------");
//         console.log("Processing key:", key);
//         console.log("typeof key:", typeof key);
//         console.log("key.length:", key.length);

//         // Log character codes to identify non-standard characters
//         const charCodes = key
//           .split("")
//           .map((char) => `${char} (${char.charCodeAt(0)})`)
//           .join(", ");
//         console.log("Character codes:", charCodes);

//         // Log with JSON.stringify to reveal hidden characters
//         console.log("JSON.stringify(key):", JSON.stringify(key));

//         console.log("key.endsWith('-light'):", key.endsWith("-light"));
//         console.log("key.endsWith('-dark'):", key.endsWith("-dark"));
//       }
//       // --- END DEBUG LOGGING ---

//       const value = key.replace(/-light|-dark$/, "");

//       // --- START DEBUG LOGGING ---
//       if (key.includes("northern") || key.includes("northerns")) {
//         console.log("Value after replace:", value);
//         console.log(
//           "JSON.stringify(value after replace):",
//           JSON.stringify(value),
//         );
//         console.log("------------------------------------");
//       }
//       // --- END DEBUG LOGGING ---

//       const label = value
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");

//       acc.set(value, { value, label });
//       return acc;
//     }, new Map<string, BaseTheme>())
//     .values(),
// );

// ================================
// ================================

// This is another regex approach and it's working with the northern-lights theme.
const generatedBaseThemes: BaseTheme[] = Array.from(
  Object.entries(allThemes)
    .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
    .reduce((acc, [key]) => {
      const value = key.replace(/-(?:light|dark)$/, ""); // Corrected regex
      const label = value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      acc.set(value, { value, label });
      return acc;
    }, new Map<string, BaseTheme>())
    .values(),
);

// ================================
// ================================

// These regex approaches should work:
// /-(?:light|dark)$/: This is excellent. (?:light|dark) is a non-capturing group. The - is literal, and the $ anchors the entire group to the end of the string.
// /(-light$|-dark$)/: This is also perfectly correct. It explicitly anchors both alternatives.
// /-(light|dark)$/: Similar to the first, but uses a capturing group. For replacement with an empty string, the effect is the same.

// ================================
// ================================

// This is using a substring approach and it's working with the northern-lights theme.
// const generatedBaseThemes: BaseTheme[] = Array.from(
//   Object.entries(allThemes)
//     .filter(([key]) => key.endsWith("-light") || key.endsWith("-dark"))
//     .reduce((acc, [key]) => {
//       let value;
//       if (key.endsWith("-light")) {
//         value = key.substring(0, key.length - "-light".length);
//       } else if (key.endsWith("-dark")) {
//         value = key.substring(0, key.length - "-dark".length);
//       } else {
//         // This path should ideally not be taken due to the filter
//         value = key;
//       }

//       const label = value
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");

//       acc.set(value, { value, label });
//       return acc;
//     }, new Map<string, BaseTheme>())
//     .values(),
// );

export const themeSwitcherBaseThemes: BaseTheme[] = [
  { value: "default", label: "Default" },
  ...generatedBaseThemes,
];
