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
