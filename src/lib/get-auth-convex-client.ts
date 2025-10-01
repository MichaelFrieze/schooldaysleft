import { env } from "@/env";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";
import { ConvexHttpClient } from "convex/browser";
import { tryCatch } from "./try-catch";

export const getAuthConvexClient = async (): Promise<ConvexHttpClient> => {
	const convex = new ConvexHttpClient(env.VITE_CONVEX_URL);
	const auth = await getAuth(getWebRequest());

	const userId = auth.userId;

	if (!userId) {
		console.error("User not authenticated");
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
		console.error("Convex token not found");
		throw new Error("Convex token not found");
	}

	return convex;
};
