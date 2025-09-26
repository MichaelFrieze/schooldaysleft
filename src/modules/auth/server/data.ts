import { tryCatch } from "@/lib/try-catch";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

export const getClerkAuth = async () => {
	const { data: authData, error: authError } = await tryCatch(
		getAuth(getWebRequest()),
	);

	console.log("authData", authData);

	if (authError) {
		throw new Error("Failed to get Clerk auth");
	}

	const { userId, getToken } = authData;

	if (userId) {
		const { data: tokenData, error: tokenError } = await tryCatch(
			getToken({ template: "convex" }),
		);

		if (tokenError) {
			throw new Error("Failed to get Clerk token");
		}

		return {
			userId,
			token: tokenData,
		};
	}

	return {
		userId: null,
		token: null,
	};
};
