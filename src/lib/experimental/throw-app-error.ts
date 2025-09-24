import { AppError, type AppErrorCode } from "@/lib/experimental/app-error";
import { logAppError } from "@/lib/experimental/app-error-logger";

type Info = { path?: string; input?: unknown };

export function throwAppError(
	ops: { code: AppErrorCode; message?: string; cause?: unknown },
	info?: Info,
): never {
	// Construct a fresh AppError and log before throwing
	const err = new AppError(ops);
	logAppError(err, info);
	throw err;
}

export function throwAppErrorFromUnknown(
	cause: unknown,
	code: AppErrorCode = "INTERNAL",
	info?: Info,
): never {
	// Normalize unknown errors by creating a new AppError with the provided code
	const err = new AppError({ code, cause });
	logAppError(err, info);
	throw err;
}
