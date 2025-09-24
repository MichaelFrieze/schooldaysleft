export type ServerFnErrorCode =
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

const HTTP_STATUS_CODE: Record<ServerFnErrorCode, number> = {
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

export function httpStatusCodeToServerFnErrorCode(
	httpStatusCode: number,
): ServerFnErrorCode {
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

const DEFAULT_MESSAGES: Record<ServerFnErrorCode, string> = {
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

export class ServerFnError extends Error {
	serverFnErrorCode: ServerFnErrorCode;
	httpStatusCode?: number;
	cause?: Error;

	constructor(opts: {
		serverFnErrorCode: ServerFnErrorCode;
		message?: string;
		cause?: unknown;
	}) {
		const coercedCause = getCauseFromUnknown(opts.cause);
		const message =
			opts.message ??
			coercedCause?.message ??
			DEFAULT_MESSAGES[opts.serverFnErrorCode];
		super(message, { cause: coercedCause });
		this.name = "ServerFnError";
		this.serverFnErrorCode = opts.serverFnErrorCode;
		this.httpStatusCode = HTTP_STATUS_CODE[opts.serverFnErrorCode];
		if (!this.cause) {
			this.cause = coercedCause;
		}
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.serverFnErrorCode,
			httpCode: this.httpStatusCode,
		};
	}
}

export const isServerFnError = (e: unknown): e is ServerFnError =>
	e instanceof ServerFnError;

export function createServerFnError(opts: {
	serverFnErrorCode: ServerFnErrorCode;
	message?: string;
	cause?: unknown;
}): ServerFnError {
	return new ServerFnError(opts);
}

export function assertOrThrowServerFnError(
	condition: unknown,
	serverFnErrorCode: ServerFnErrorCode,
	message?: string,
): asserts condition {
	if (!condition) {
		throw new ServerFnError({ serverFnErrorCode, message });
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

export function getServerFnErrorFromUnknown(
	cause: unknown,
	serverFnErrorCode: ServerFnErrorCode = "INTERNAL_SERVER_ERROR",
): ServerFnError {
	if (isServerFnError(cause)) return cause;
	if (cause instanceof Error && cause.name === "ServerFnError")
		return cause as ServerFnError;

	const serverFnError = new ServerFnError({ serverFnErrorCode, cause });
	if (cause instanceof Error && cause.stack) {
		serverFnError.stack = cause.stack;
	}
	return serverFnError;
}
