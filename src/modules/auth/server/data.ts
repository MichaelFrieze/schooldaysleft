import { getAuth } from "@clerk/tanstack-react-start/server";
import { getWebRequest } from "@tanstack/react-start/server";

export const getClerkUserIdAndToken = async () => {
	const auth = await getAuth(getWebRequest());
	const token = await auth.getToken({ template: "convex" });

	return {
		userId: auth.userId,
		token,
	};
};
