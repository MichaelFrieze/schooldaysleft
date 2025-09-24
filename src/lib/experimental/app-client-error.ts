import { type AppErrorCode, statusToCode } from "@/lib/experimental/app-error";

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
	readonly code: AppErrorCode;
	readonly status?: number;
	readonly data?: unknown;
	meta?: Record<string, unknown>;
	// Explicit cause to preserve chaining in environments where it's supported
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore cause may not be declared in Error depending on TS lib
	public override readonly cause: Maybe<Error>;

	constructor(
		message: string,
		opts: {
			code: AppErrorCode;
			status?: number;
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
		this.code = opts.code;
		this.status = opts.status;
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
		defaultCode: AppErrorCode = "INTERNAL",
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
				code,
				status,
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
				c.status ??
				c.statusCode;
			const status = isNumeric(statusRaw) ? Number(statusRaw) : undefined;
			const code = status ? statusToCode(status) : defaultCode;
			const message =
				typeof (c.message as unknown) === "string"
					? (c.message as string)
					: code;
			return new AppClientError(message, {
				code,
				status,
				data: undefined,
				cause: coerceErrorFromUnknown(cause),
				meta: opts.meta,
			});
		}

		// Envelope shape: { error: { code, message, status?, data? } }
		if (isObject(cause) && isObject((cause as Record<string, unknown>).error)) {
			const errObj = (cause as Record<string, unknown>).error as Record<
				string,
				unknown
			>;
			const statusCandidate =
				(errObj as { httpStatusCode?: unknown }).httpStatusCode ??
				(errObj as { statusCode?: unknown }).statusCode ??
				(errObj as { status?: unknown }).status;
			const status = isNumeric(statusCandidate as number)
				? Number(statusCandidate as number)
				: undefined;
			const code = (
				typeof errObj.code === "string"
					? (errObj.code as string)
					: status
						? statusToCode(status)
						: defaultCode
			) as AppErrorCode;
			const message =
				typeof errObj.message === "string" ? (errObj.message as string) : code;
			return new AppClientError(message, {
				code,
				status,
				data: errObj.data,
				cause: coerceErrorFromUnknown(cause),
				meta: opts.meta,
			});
		}

		// Fallback
		const base = coerceErrorFromUnknown(cause);
		const message = base?.message ?? String(defaultCode);
		return new AppClientError(message, {
			code: defaultCode,
			cause: base,
			meta: opts.meta,
		});
	}
}

export const isAppClientError = (e: unknown): e is AppClientError =>
	AppClientError.is(e);

export function getAppClientErrorFromUnknown(
	cause: unknown,
	code: AppErrorCode = "INTERNAL",
	opts?: { meta?: Record<string, unknown> },
): AppClientError {
	return AppClientError.from(cause, code, opts);
}
