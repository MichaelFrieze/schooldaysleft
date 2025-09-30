import { env } from "@/env";
import { tryCatch } from "@/lib/try-catch";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { api } from "convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export const getAllCountdowns = createServerFn({ method: "GET" }).handler(
	async () => {
		const convex = new ConvexHttpClient(env.VITE_CONVEX_URL);
		const auth = await getAuth(getWebRequest());

		const userId = auth.userId;

		if (!userId) {
			throw new Error("User not authenticated");
		}

		const { data: token, error } = await tryCatch(
			auth.getToken({ template: "convex" }),
		);

		if (error) {
			console.error(error);
			throw new Error("Failed to get Clerk token");
		}

		if (token) {
			convex.setAuth(token);
		} else {
			throw new Error("Convex token not found");
		}

		const { data: countdowns, error: countdownsError } = await tryCatch(
			convex.query(api.countdowns.getAll),
		);

		if (countdownsError) {
			console.error(countdownsError);
			throw new Error("Failed to get all countdowns");
		}

		// Only convert Convex Id objects to plain strings for transport
		const serializedCountdowns = countdowns.map((c) => ({
			...c,
			_id: String(c._id),
		}));

		return serializedCountdowns;
	},
);
