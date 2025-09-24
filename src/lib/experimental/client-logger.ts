import type { AppClientError } from "@/lib/experimental/app-client-error";
import { isAppClientError } from "@/lib/experimental/app-client-error";

type OpType = "query" | "mutation" | "serverFn";
type ColorMode = "css" | "none";

type ConsoleLike = Pick<
	Console,
	"log" | "error" | "groupCollapsed" | "groupEnd"
>;

export type ClientLogEvent =
	| {
			direction: "up";
			type: OpType;
			id?: string | number;
			path?: string;
			input?: unknown;
			context?: unknown;
	  }
	| {
			direction: "down";
			type: OpType;
			id?: string | number;
			path?: string;
			input?: unknown;
			elapsedMs: number;
			result?: unknown;
			error?: AppClientError | Error;
			context?: unknown;
	  };

export interface ClientLoggerOptions {
	console?: ConsoleLike;
	colorMode?: ColorMode;
	withContext?: boolean;
}

function isFormData(value: unknown): value is FormData {
	if (typeof FormData === "undefined") return false;
	return value instanceof FormData;
}

const palettes = {
	css: {
		query: ["72e3ff", "3fb0d8"],
		mutation: ["c5a3fc", "904dfc"],
		serverFn: ["ffe082", "ffb300"],
	},
} as const;

function sanitizeErrorForLog(
	err: unknown,
	includeStack: boolean,
): Record<string, unknown> {
	if (isAppClientError(err)) {
		const httpStatusCode = (err as { httpStatusCode?: number }).httpStatusCode;
		return {
			name: "AppClientError",
			appErrorCode: (err as { appErrorCode: string }).appErrorCode,
			httpStatusCode,
			message: err.message,
			...(includeStack && err.stack ? { stack: err.stack } : {}),
		};
	}
	if (err instanceof Error) {
		return {
			name: err.name,
			message: err.message,
			...(includeStack && err.stack ? { stack: err.stack } : {}),
		};
	}
	return { message: String(err) };
}

function buildPartsAndArgs(
	evt: ClientLogEvent,
	colorMode: ColorMode,
	withContext?: boolean,
	includeStack?: boolean,
): { parts: string[]; args: unknown[] } {
	const { direction, type, path, id } = evt;
	const displayPath = path ?? "-";
	const parts: string[] = [];
	const args: unknown[] = [];

	if (colorMode === "none") {
		parts.push(
			direction === "up" ? ">>" : "<<",
			type,
			`#${id ?? "-"}`,
			displayPath,
		);
	} else {
		const [light, dark] = palettes.css[type];
		const css = `\n    background-color: #${direction === "up" ? light : dark};\n    color: ${direction === "up" ? "black" : "white"};\n    padding: 2px;\n  `;
		parts.push(
			"%c",
			direction === "up" ? ">>" : "<<",
			type,
			`#${id ?? "-"}`,
			`%c${displayPath}%c`,
			"%O",
		);
		args.push(
			css,
			`${css}; font-weight: bold;`,
			`${css}; font-weight: normal;`,
		);
	}

	if (direction === "up") {
		const rawInput = (evt as Extract<ClientLogEvent, { direction: "up" }>)
			.input;
		const input = isFormData(rawInput)
			? Object.fromEntries(rawInput)
			: rawInput;
		args.push(withContext ? { input, context: evt.context } : { input });
	} else {
		const down = evt as Extract<ClientLogEvent, { direction: "down" }>;
		const rawInput = down.input;
		const input = isFormData(rawInput)
			? Object.fromEntries(rawInput)
			: rawInput;
		const payload: Record<string, unknown> = {
			input,
			elapsedMs: down.elapsedMs,
			...(withContext ? { context: evt.context } : {}),
		};
		if (down.error) {
			payload.error = sanitizeErrorForLog(down.error, Boolean(includeStack));
		} else if (typeof down.result !== "undefined") {
			payload.result = down.result;
		}
		args.push(payload);
	}

	return { parts, args };
}

/**
 * Client-side logger inspired by tRPC's loggerLink.
 * - In dev: logs both "up" and "down" events
 * - In prod: logs only "down" events
 */
export function logClientEvent(
	evt: ClientLogEvent,
	opts: ClientLoggerOptions = {},
) {
	if (typeof window === "undefined") return; // client-only

	const isDev = import.meta.env.DEV;
	if (!isDev && evt.direction === "up") return; // prod: only down

	const c: ConsoleLike = opts.console ?? console;
	const colorMode: ColorMode = opts.colorMode ?? "css";
	const withContext = opts.withContext ?? colorMode === "css";

	const includeStack = isDev; // do not include stack in production logs
	const { parts, args } = buildPartsAndArgs(
		evt,
		colorMode,
		withContext,
		includeStack,
	);

	const shouldError =
		evt.direction === "down" &&
		"error" in evt &&
		Boolean((evt as Extract<ClientLogEvent, { direction: "down" }>).error);

	const fn: "error" | "log" = shouldError ? "error" : "log";

	// Group for better readability in dev
	if (isDev && c.groupCollapsed && c.groupEnd) {
		const header = parts.join(" ");
		// When using CSS mode, the first 3 args are CSS strings for %c tokens.
		const headerArgsCount = colorMode === "css" ? 3 : 0;
		const headerArgs = (args as unknown[]).slice(0, headerArgsCount);
		const payload = (args as unknown[])[headerArgsCount];

		// Render styled header in the group title
		c.groupCollapsed.apply(null, [header].concat(headerArgs as []));

		// Print only the payload/body once inside the group
		if (typeof payload !== "undefined") {
			c[fn].apply(null, [payload]);
		}
		c.groupEnd();
	} else {
		c[fn].apply(null, [parts.join(" ")].concat(args as []));
	}
}
