import {
	type AppErrorCode,
	httpStatusCodeToAppErrorCode,
} from "@/lib/app-error";

type Maybe<T> = T | undefined;

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isNumeric(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function coerceErrorFromUnknown(value: unknown): Error | undefined {
	if (value instanceof Error) return value;
	if (typeof value === "string") return new Error(value);
	if (isObject(value) && typeof value.message === "string")
		return new Error(String(value.message));
	return undefined;
}

export class AppClientError extends Error {
	readonly appErrorCode: AppErrorCode;
	readonly httpStatusCode?: number;
	readonly data?: unknown;
	meta?: Record<string, unknown>;
	// Explicit cause to preserve chaining in environments where it's supported
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore cause may not be declared in Error depending on TS lib
	public override readonly cause: Maybe<Error>;

	constructor(
		message: string,
		opts: {
			appErrorCode: AppErrorCode;
			httpStatusCode?: number;
			data?: unknown;
			cause?: unknown;
			meta?: Record<string, unknown>;
		},
	) {
		const coercedCause = coerceErrorFromUnknown(opts.cause);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore https://github.com/tc39/proposal-error-cause
		super(message, { cause: coercedCause });

		this.name = "AppClientError";
		this.appErrorCode = opts.appErrorCode;
		this.httpStatusCode = opts.httpStatusCode;
		this.data = opts.data;
		this.meta = opts.meta;
		this.cause = coercedCause;

		Object.setPrototypeOf(this, AppClientError.prototype);
	}

	static is(value: unknown): value is AppClientError {
		return (
			value instanceof AppClientError ||
			(value instanceof Error && value.name === "AppClientError")
		);
	}

	static from(
		cause: unknown,
		defaultAppErrorCode: AppErrorCode = "INTERNAL_SERVER_ERROR",
		opts: { meta?: Record<string, unknown> } = {},
	): AppClientError {
		// Already normalized
		if (AppClientError.is(cause)) {
			if (opts.meta) {
				cause.meta = { ...(cause.meta ?? {}), ...opts.meta };
			}
			return cause;
		}

		// Serialized AppError coming across the wire
		if (
			isObject(cause) &&
			(cause as Record<string, unknown>).name === "AppError" &&
			typeof (cause as Record<string, unknown>).code === "string"
		) {
			const causeObj = cause as Record<string, unknown>;
			const code = causeObj.code as AppErrorCode;
			const statusCandidate =
				(causeObj as { httpStatusCode?: unknown }).httpStatusCode ??
				(causeObj as { httpCode?: unknown }).httpCode ??
				(causeObj as { statusCode?: unknown }).statusCode ??
				(causeObj as { status?: unknown }).status;
			const status = isNumeric(statusCandidate as number)
				? Number(statusCandidate as number)
				: undefined;
			const message =
				typeof causeObj.message === "string"
					? (causeObj.message as string)
					: code;
			return new AppClientError(message, {
				appErrorCode: code,
				httpStatusCode: status,
				data: undefined,
				cause: coerceErrorFromUnknown(cause),
				meta: opts.meta,
			});
		}

		// Boom/http-errors or generic Error with status/statusCode
		if (isObject(cause) && ("status" in cause || "statusCode" in cause)) {
			const c = cause as Record<string, unknown> & {
				status?: number;
				statusCode?: number;
			};
			const statusRaw =
				(c as { httpStatusCode?: number }).httpStatusCode ??
				(c as { httpCode?: number }).httpCode ??
				c.status ??
				c.statusCode;
			const status = isNumeric(statusRaw) ? Number(statusRaw) : undefined;
			const code = status
				? httpStatusCodeToAppErrorCode(status)
				: defaultAppErrorCode;
			const message =
				typeof (c.message as unknown) === "string"
					? (c.message as string)
					: code;
			return new AppClientError(message, {
				appErrorCode: code,
				httpStatusCode: status,
				data: undefined,
				cause: coerceErrorFromUnknown(cause),
				meta: opts.meta,
			});
		}

		// Envelope shape: { error: { code, message, httpStatusCode?/httpCode?/status?/statusCode?, data? } }
		if (isObject(cause) && isObject((cause as Record<string, unknown>).error)) {
			const errObj = (cause as Record<string, unknown>).error as Record<
				string,
				unknown
			>;
			const statusCandidate =
				(errObj as { httpStatusCode?: unknown }).httpStatusCode ??
				(errObj as { httpCode?: unknown }).httpCode ??
				(errObj as { statusCode?: unknown }).statusCode ??
				(errObj as { status?: unknown }).status;
			const status = isNumeric(statusCandidate as number)
				? Number(statusCandidate as number)
				: undefined;
			const code = (
				typeof errObj.code === "string"
					? (errObj.code as string)
					: status
						? httpStatusCodeToAppErrorCode(status)
						: defaultAppErrorCode
			) as AppErrorCode;
			const message =
				typeof errObj.message === "string" ? (errObj.message as string) : code;
			return new AppClientError(message, {
				appErrorCode: code,
				httpStatusCode: status,
				data: errObj.data,
				cause: coerceErrorFromUnknown(cause),
				meta: opts.meta,
			});
		}

		// Fallback
		const base = coerceErrorFromUnknown(cause);
		const message = base?.message ?? String(defaultAppErrorCode);
		return new AppClientError(message, {
			appErrorCode: defaultAppErrorCode,
			cause: base,
			meta: opts.meta,
		});
	}
}

export const isAppClientError = (e: unknown): e is AppClientError =>
	AppClientError.is(e);

export function getAppClientErrorFromUnknown(
	cause: unknown,
	appErrorCode: AppErrorCode = "INTERNAL_SERVER_ERROR",
	opts?: { meta?: Record<string, unknown> },
): AppClientError {
	return AppClientError.from(cause, appErrorCode, opts);
}
