import { AppError } from "@/lib/experimental/app-error";
import { logAppError } from "@/lib/experimental/app-error-logger";
import { tryCatch } from "@/lib/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { getClerkAuth } from "./data";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
	async () => {
		const { data, error } = await tryCatch(getClerkAuth());

		if (error) {
			const appError = new AppError({
				code: "UNAUTHORIZED",
				message: error.message,
				cause: error,
			});
			logAppError(appError);
			throw appError;
		}

		const { userId, token } = data;

		return {
			userId,
			token,
		};
	},
);
