import {
	Link,
	type LinkProps,
	type RegisteredRouter,
	useNavigate,
} from "@tanstack/react-router";
import type { ComponentProps, ReactElement } from "react";

type FastLinkProps = LinkProps<RegisteredRouter["routeTree"]> &
	ComponentProps<"a">;

export function FastLink(props: FastLinkProps): ReactElement {
	const navigate = useNavigate();

	const handleNavigate = (): void => {
		const options = {
			to: props.to,
			...(props.params && { params: props.params }),
			...(props.search && { search: props.search }),
			...(props.hash && { hash: props.hash }),
		};

		navigate(options);
	};

	return <Link {...props} {...clickHandlers(handleNavigate)} />;
}

// This utility function is used to speed up the click but preserve the native behavior
function clickHandlers(callback: () => void) {
	return {
		onMouseDown: (e: React.MouseEvent<Element>) => {
			// Only handle left-clicks without modifier keys
			if (
				e.button === 0 &&
				!e.altKey &&
				!e.ctrlKey &&
				!e.metaKey &&
				!e.shiftKey
			) {
				e.preventDefault();
				callback();
			}
		},
		onKeyDown: (e: React.KeyboardEvent<Element>) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				callback();
			}
		},
	};
}
