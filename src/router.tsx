import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./components/providers/query-provider";

import { DefaultCatchBoundary } from "./components/errors/default-catch-boundary";
import { NotFound } from "./components/errors/not-found";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const createRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createTanstackRouter({
		routeTree,
		context: { ...rqContext },
		scrollRestoration: true,
		// defaultPreloadStaleTime: 0,
		defaultPreload: "intent",
		defaultErrorComponent: ({ error, reset }) => (
			<DefaultCatchBoundary error={error} reset={reset} />
		),
		defaultNotFoundComponent: () => <NotFound />,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanstackQuery.Provider {...rqContext}>
					{props.children}
				</TanstackQuery.Provider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
		wrapQueryClient: false,
	});

	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
