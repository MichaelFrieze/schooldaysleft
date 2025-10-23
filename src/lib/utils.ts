import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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
