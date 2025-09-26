import { isServerFnError } from "@/lib/server-fn-error";
import { getWebRequest } from "@tanstack/react-start/server";

type LoggerInfo = { path?: string; input?: unknown };

export function logServerFnError(error: unknown, info?: LoggerInfo) {
	if (!import.meta.env.DEV) return;

	if (typeof window !== "undefined") return;

	const RESET = "\x1b[0m";
	const BOLD = "\x1b[1m";
	const RED = "\x1b[31m";
	const YELLOW = "\x1b[33m";

	let method = "";
	let url = "";
	try {
		const req = getWebRequest();
		method = req.method || "";
		url = req.url || "";
	} catch {}

	const header = `${RED}❌ ServerFn Error${RESET}${info?.path ? ` (${info.path})` : ""}`;

	const baseParts = [
		header,
		method && `Method: ${method}`,
		url && `URL: ${url}`,
		info?.input && `Input: ${JSON.stringify(info.input)}`,
	]
		.filter(Boolean)
		.join(" | ");

	let detail = "";
	if (isServerFnError(error)) {
		const appErrorCode = error.serverFnErrorCode;
		const httpStatusCode = error.httpStatusCode;
		detail = `Code: ${appErrorCode}${httpStatusCode ? ` | HTTP_Status_Code: ${httpStatusCode}` : ""} | Message: ${error.message}`;
	} else if (error instanceof Error) {
		detail = `Message: ${error.message}`;
	} else {
		detail = `Message: ${String(error)}`;
	}

	let output = `${baseParts}${baseParts ? " | " : ""}${detail}`;

	const stack = error instanceof Error ? error.stack : undefined;
	if (stack) {
		const separator = "═".repeat(100);
		output += `\n\n${BOLD}${YELLOW}🧵 Stack:${RESET}\n${stack}\n${separator}\n\n`;
	}

	console.error(output);
}
