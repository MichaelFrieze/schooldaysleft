import { getAuth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
	async () => {
		const { userId, getToken } = await getAuth(getWebRequest());
		const token = await getToken({ template: "convex" });

		return {
			userId,
			token,
		};
	},
);
