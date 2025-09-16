import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_URL: z.string().url().optional(),
		CLERK_SECRET_KEY: z.string().min(1),
		CONVEX_DEPLOYMENT: z.string().min(1),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_",

	client: {
		VITE_APP_TITLE: z.string().min(1).optional(),

		VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		VITE_CLERK_SIGN_IN_URL: z.string().min(1),
		VITE_CLERK_SIGN_UP_URL: z.string().min(1),
		VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string().min(1),
		VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string().min(1),

		VITE_CONVEX_URL: z.string().url(),
	},

	/**
	 * You can't destruct `import.meta.env` as a regular object, so we need to
	 * destruct manually. This also ensures all variables are explicitly listed.
	 */
	runtimeEnv: {
		// Server variables
		SERVER_URL: process.env.SERVER_URL,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,

		// Client variables (must have VITE_ prefix)
		VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,

		VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
		VITE_CLERK_SIGN_IN_URL: import.meta.env.VITE_CLERK_SIGN_IN_URL,
		VITE_CLERK_SIGN_UP_URL: import.meta.env.VITE_CLERK_SIGN_UP_URL,
		VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: import.meta.env
			.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
		VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: import.meta.env
			.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,

		VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
	},

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
