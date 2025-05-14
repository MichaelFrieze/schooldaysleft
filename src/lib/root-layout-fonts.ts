import {
  Open_Sans,
  DM_Sans,
  Outfit,
  Architects_Daughter,
  Inter,
  Geist,
  Geist_Mono,
  Montserrat,
  Plus_Jakarta_Sans,
  Source_Serif_4,
  Lora,
  Merriweather,
  IBM_Plex_Mono,
  Space_Mono,
  Fira_Code,
  JetBrains_Mono,
  Ubuntu_Mono,
  Roboto_Mono,
  Roboto,
} from "next/font/google";

// --- Sans Serif Fonts ---
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// // --- Serif Fonts ---
const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: "400",
});

// --- Monospace Fonts ---
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: "400",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: "400",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
  weight: "400",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const fontVariables = [
  openSans.variable,
  dmSans.variable,
  outfit.variable,
  architectsDaughter.variable,
  inter.variable,
  montserrat.variable,
  geist.variable,
  plusJakartaSans.variable,
  sourceSerif4.variable,
  lora.variable,
  merriweather.variable,
  ibmPlexMono.variable,
  spaceMono.variable,
  firaCode.variable,
  jetbrainsMono.variable,
  ubuntuMono.variable,
  geistMono.variable,
  robotoMono.variable,
  roboto.variable,
].join(" ");
