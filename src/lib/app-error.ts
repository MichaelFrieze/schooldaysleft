export type AppErrorCode =
	| "INTERNAL_SERVER_ERROR"
	| "PARSE_ERROR"
	| "BAD_REQUEST"
	| "NOT_IMPLEMENTED"
	| "BAD_GATEWAY"
	| "SERVICE_UNAVAILABLE"
	| "GATEWAY_TIMEOUT"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "METHOD_NOT_SUPPORTED"
	| "TIMEOUT"
	| "CONFLICT"
	| "PRECONDITION_FAILED"
	| "PAYLOAD_TOO_LARGE"
	| "UNSUPPORTED_MEDIA_TYPE"
	| "UNPROCESSABLE_CONTENT"
	| "TOO_MANY_REQUESTS"
	| "CLIENT_CLOSED_REQUEST";

const HTTP_STATUS_CODE: Record<AppErrorCode, number> = {
	INTERNAL_SERVER_ERROR: 500,
	PARSE_ERROR: 400,
	BAD_REQUEST: 400,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_SUPPORTED: 405,
	TIMEOUT: 504,
	CONFLICT: 409,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	UNSUPPORTED_MEDIA_TYPE: 415,
	UNPROCESSABLE_CONTENT: 422,
	TOO_MANY_REQUESTS: 429,
	CLIENT_CLOSED_REQUEST: 499,
};

export function httpStatusCodeToAppErrorCode(
	httpStatusCode: number,
): AppErrorCode {
	if (httpStatusCode === 400) return "BAD_REQUEST";
	if (httpStatusCode === 401) return "UNAUTHORIZED";
	if (httpStatusCode === 403) return "FORBIDDEN";
	if (httpStatusCode === 404) return "NOT_FOUND";
	if (httpStatusCode === 405) return "METHOD_NOT_SUPPORTED";
	if (httpStatusCode === 408) return "TIMEOUT";
	if (httpStatusCode === 409) return "CONFLICT";
	if (httpStatusCode === 412) return "PRECONDITION_FAILED";
	if (httpStatusCode === 413) return "PAYLOAD_TOO_LARGE";
	if (httpStatusCode === 415) return "UNSUPPORTED_MEDIA_TYPE";
	if (httpStatusCode === 422) return "UNPROCESSABLE_CONTENT";
	if (httpStatusCode === 429) return "TOO_MANY_REQUESTS";
	if (httpStatusCode === 499) return "CLIENT_CLOSED_REQUEST";
	if (httpStatusCode === 500) return "INTERNAL_SERVER_ERROR";
	if (httpStatusCode === 501) return "NOT_IMPLEMENTED";
	if (httpStatusCode === 502) return "BAD_GATEWAY";
	if (httpStatusCode === 503) return "SERVICE_UNAVAILABLE";
	if (httpStatusCode === 504) return "GATEWAY_TIMEOUT";

	return "INTERNAL_SERVER_ERROR";
}

const DEFAULT_MESSAGES: Record<AppErrorCode, string> = {
	INTERNAL_SERVER_ERROR: "Internal server error",
	PARSE_ERROR: "Parse error",
	BAD_REQUEST: "Bad request",
	NOT_IMPLEMENTED: "Not implemented",
	BAD_GATEWAY: "Bad gateway",
	SERVICE_UNAVAILABLE: "Service unavailable",
	GATEWAY_TIMEOUT: "Gateway timeout",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	NOT_FOUND: "Not found",
	METHOD_NOT_SUPPORTED: "Method not supported",
	TIMEOUT: "Timeout",
	CONFLICT: "Conflict",
	PRECONDITION_FAILED: "Precondition failed",
	PAYLOAD_TOO_LARGE: "Payload too large",
	UNSUPPORTED_MEDIA_TYPE: "Unsupported media type",
	UNPROCESSABLE_CONTENT: "Unprocessable content",
	TOO_MANY_REQUESTS: "Too many requests",
	CLIENT_CLOSED_REQUEST: "Client closed request",
};

export class AppError extends Error {
	appErrorCode: AppErrorCode;
	httpStatusCode?: number;
	cause?: Error;

	constructor(opts: {
		appErrorCode: AppErrorCode;
		message?: string;
		cause?: unknown;
	}) {
		const coercedCause = getCauseFromUnknown(opts.cause);
		const message =
			opts.message ??
			coercedCause?.message ??
			DEFAULT_MESSAGES[opts.appErrorCode];
		super(message, { cause: coercedCause });
		this.name = "AppError";
		this.appErrorCode = opts.appErrorCode;
		this.httpStatusCode = HTTP_STATUS_CODE[opts.appErrorCode];
		if (!this.cause) {
			this.cause = coercedCause;
		}
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.appErrorCode,
			httpCode: this.httpStatusCode,
		};
	}
}

export const isAppError = (e: unknown): e is AppError => e instanceof AppError;

export function createAppError(opts: {
	appErrorCode: AppErrorCode;
	message?: string;
	cause?: unknown;
}): AppError {
	return new AppError(opts);
}

export function assertOrThrow(
	condition: unknown,
	appErrorCode: AppErrorCode,
	message?: string,
): asserts condition {
	if (!condition) {
		throw new AppError({ appErrorCode, message });
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
	appErrorCode: AppErrorCode = "INTERNAL_SERVER_ERROR",
): AppError {
	if (isAppError(cause)) return cause;
	if (cause instanceof Error && cause.name === "AppError")
		return cause as AppError;

	const appError = new AppError({ appErrorCode, cause });
	if (cause instanceof Error && cause.stack) {
		appError.stack = cause.stack;
	}
	return appError;
}
