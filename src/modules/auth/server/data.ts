import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

const SIMULATE_AUTH_ERROR = true; // set to true to simulate an error

export const getClerkAuth = async () => {
	if (SIMULATE_AUTH_ERROR) {
		throw new Error("Simulated Clerk auth failure");
	}

	const { userId, getToken } = await getAuth(getWebRequest());
	const token = await getToken({ template: "convex" });

	return {
		userId,
		token,
	};
};
