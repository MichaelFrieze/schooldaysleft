import { tryCatch } from "@/lib/try-catch";
import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

export const getClerkAuthAndToken = async () => {
	const { data: authData, error: authError } = await tryCatch(
		getAuth(getWebRequest()),
	);

	if (authError) {
		throw new Error("Clerk getAuth error");
	}

	const { userId, getToken } = authData;

	if (userId) {
		const { data: tokenData, error: tokenError } = await tryCatch(
			getToken({ template: "convex" }),
		);

		if (tokenError) {
			throw new Error("Clerk getToken error");
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
