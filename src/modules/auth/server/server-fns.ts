import { AppError } from "@/lib/app-error";
import { logAppError } from "@/lib/app-error-logger";
import { tryCatch } from "@/lib/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { getClerkAuthAndToken } from "./data";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
	async () => {
		const { data, error } = await tryCatch(getClerkAuthAndToken());

		if (error) {
			const appError = new AppError({
				appErrorCode: "INTERNAL_SERVER_ERROR",
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
