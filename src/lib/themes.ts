export type ThemeKey = "light" | "dark";

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

const cosmicNightLight: Theme = {
	background: "#f5f5ff",
	foreground: "#2a2a4a",
	card: "#ffffff",
	primary: "#6e56cf",
	secondary: "#e4dfff",
	muted: "#f0f0fa",
	mutedForeground: "#6c6c8a",
	accent: "#d8e6ff",
	accentForeground: "#2a2a4a",
	destructive: "#ff5470",
	border: "#e0e0f0",
	input: "#e0e0f0",
	fontSans: "Inter, sans-serif",
	radius: "0.5rem",
};

const cosmicNightDark: Theme = {
	background: "#0f0f1a",
	foreground: "#e2e2f5",
	card: "#1a1a2e",
	primary: "#a48fff",
	secondary: "#2d2b55",
	muted: "#222244",
	mutedForeground: "#a0a0c0",
	accent: "#303060",
	accentForeground: "#e2e2f5",
	destructive: "#ff5470",
	border: "#303052",
	input: "#303052",
	fontSans: "Inter, sans-serif",
	radius: "0.5rem",
};

export const themes: Record<ThemeKey, Theme> = {
	light: cosmicNightLight,
	dark: cosmicNightDark,
};
