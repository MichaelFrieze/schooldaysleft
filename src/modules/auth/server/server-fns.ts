import { ServerFnError } from "@/lib/server-fn-error";
import { logServerFnError } from "@/lib/server-fn-error-logger";
import { tryCatch } from "@/lib/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { getClerkAuth } from "./data";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
	async () => {
		const { data, error } = await tryCatch(getClerkAuth());

		if (error) {
			const serverFnError = new ServerFnError({
				serverFnErrorCode: "INTERNAL_SERVER_ERROR",
				message: error.message,
				cause: error,
			});
			logServerFnError(serverFnError);
			throw serverFnError;
		}

		const { userId, token } = data;

		return {
			userId,
			token,
		};
	},
);
