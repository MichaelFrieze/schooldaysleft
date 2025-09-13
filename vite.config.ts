import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	// build: {
	// 	sourcemap: false,
	// },
	// optimizeDeps: {
	//   entries: ['src/**/*.tsx', 'src/**/*.ts'],
	//   exclude: ['@radix-ui/react-select'],
	// },
	// optimizeDeps: {
	// 	exclude: [
	// 		"@tanstack/react-router-devtools",
	// 		"@tanstack/react-query-devtools",
	// 	],
	// },
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({
			customViteReactPlugin: true,
			target: "vercel", // remove this for local pnpm start
		}),
		viteReact(),
	],
});

export default config;
