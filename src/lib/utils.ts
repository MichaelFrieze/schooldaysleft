import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// This utility function is used to speed up the click but preserve the native behavior: https://x.com/letstri/status/1949051354217054648
export function clickHandlers(callback: () => void) {
	return {
		onMouseDown: callback,
		onClick: (e: React.MouseEvent<Element>) => {
			e.preventDefault();
		},
		onKeyDown: (e: React.KeyboardEvent<Element>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				callback();
			}
		},
	};
}

export function formatDate(
	date: Date | number | string | null | undefined,
): string {
	if (date === null || date === undefined) return "N/A";

	let normalizedDate: Date;

	if (date instanceof Date) {
		normalizedDate = date;
	} else if (typeof date === "number") {
		normalizedDate = new Date(date);
	} else if (typeof date === "string") {
		const parsed = new Date(date);
		if (Number.isNaN(parsed.getTime())) return "Invalid date";
		normalizedDate = parsed;
	} else {
		return "N/A";
	}

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(normalizedDate);
}
