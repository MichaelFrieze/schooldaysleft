export type AppErrorCode =
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "CONFLICT"
	| "TOO_MANY_REQUESTS"
	| "INTERNAL";

const STATUS: Record<AppErrorCode, number> = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	TOO_MANY_REQUESTS: 429,
	INTERNAL: 500,
};

const DEFAULT_MESSAGES: Record<AppErrorCode, string> = {
	BAD_REQUEST: "Bad request",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	NOT_FOUND: "Not found",
	CONFLICT: "Conflict",
	TOO_MANY_REQUESTS: "Too many requests",
	INTERNAL: "Internal server error",
};

export class AppError extends Error {
	code: AppErrorCode;
	httpStatusCode?: number;
	cause?: Error;

	constructor(opts: { code: AppErrorCode; message?: string; cause?: unknown }) {
		const coercedCause = getCauseFromUnknown(opts.cause);
		const message =
			opts.message ?? coercedCause?.message ?? DEFAULT_MESSAGES[opts.code];
		super(message, { cause: coercedCause });
		this.name = "AppError";
		this.code = opts.code;
		this.httpStatusCode = STATUS[opts.code];
		if (!this.cause) {
			this.cause = coercedCause;
		}
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.code,
			httpStatusCode: this.httpStatusCode,
		};
	}
}

export const isAppError = (e: unknown): e is AppError => e instanceof AppError;

export function statusToCode(status: number): AppErrorCode {
	if (status === 400) return "BAD_REQUEST";
	if (status === 401) return "UNAUTHORIZED";
	if (status === 403) return "FORBIDDEN";
	if (status === 404) return "NOT_FOUND";
	if (status === 409) return "CONFLICT";
	if (status === 429) return "TOO_MANY_REQUESTS";
	return "INTERNAL";
}

export function createAppError(opts: {
	code: AppErrorCode;
	message?: string;
	cause?: unknown;
}): AppError {
	return new AppError(opts);
}

export function assertOrThrow(
	condition: unknown,
	code: AppErrorCode,
	message?: string,
): asserts condition {
	if (!condition) {
		throw new AppError({ code, message });
	}
}

class UnknownCauseError extends Error {
	[key: string]: unknown;
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function getCauseFromUnknown(cause: unknown): Error | undefined {
	if (cause instanceof Error) return cause;

	const type = typeof cause;
	if (type === "undefined" || type === "function" || cause === null) {
		return undefined;
	}

	if (type !== "object") {
		return new Error(String(cause));
	}

	if (isObject(cause)) {
		const err = new UnknownCauseError();
		for (const key in cause) {
			try {
				// @ts-ignore index signature on UnknownCauseError
				err[key] = (cause as Record<string, unknown>)[key];
			} catch {}
		}
		return err;
	}

	return undefined;
}

export function getAppErrorFromUnknown(
	cause: unknown,
	code: AppErrorCode = "INTERNAL",
): AppError {
	if (isAppError(cause)) return cause;
	if (cause instanceof Error && cause.name === "AppError")
		return cause as AppError;

	const appError = new AppError({ code, cause });
	if (cause instanceof Error && cause.stack) {
		appError.stack = cause.stack;
	}
	return appError;
}
