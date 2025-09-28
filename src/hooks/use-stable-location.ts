import { useRouterState } from "@tanstack/react-router";
import { useMemo, useRef } from "react";

export default function useStableLocation() {
	const { isLoading, pathname } = useRouterState({
		select: (state) => ({
			isLoading: state.isLoading,
			pathname: state.location.pathname,
		}),
	});
	const matchingLocation = useRef<string>(pathname);
	return useMemo(() => {
		if (!isLoading && matchingLocation.current !== pathname) {
			matchingLocation.current = pathname;
		}
		return matchingLocation.current;
	}, [isLoading, pathname]);
}

// This works more like useLocation in react router.
// https://github.com/TanStack/router/issues/3110
