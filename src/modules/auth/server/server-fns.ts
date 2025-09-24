import { AppError } from "@/lib/app-error";
import { tryCatch } from "@/lib/try-catch";
import { createServerFn } from "@tanstack/react-start";
import { getClerkAuth } from "./data";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
	async () => {
		const { data, error } = await tryCatch(getClerkAuth());

		if (error) {
			const appError = new AppError({
				appErrorCode: "UNAUTHORIZED",
				message: error.message,
				cause: error,
			});
			// console.error(appError);
			throw appError;
		}

		const { userId, token } = data;

		return {
			userId,
			token,
		};
	},
);
