import { getAppClientErrorFromUnknown } from "@/lib/experimental/app-client-error";
import { logClientEvent } from "@/lib/experimental/client-logger";

type OpType = "query" | "mutation" | "serverFn";

type Info = {
	path?: string;
	type?: OpType;
	input?: unknown;
	startedAt?: number; // for latency measurement
};

export function throwAppClientError(cause: unknown, info?: Info): never {
	const err = getAppClientErrorFromUnknown(cause);

	const elapsedMs = info?.startedAt ? Date.now() - info.startedAt : 0;

	logClientEvent({
		direction: "down",
		type: info?.type ?? "serverFn",
		path: info?.path,
		input: info?.input,
		elapsedMs,
		error: err,
	});

	throw err;
}
