import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NotFound } from "./components/errors/not-found";
import { RootCatchBoundary } from "./components/errors/root-catch-boundary";
import { env } from "./env";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const CONVEX_URL = env.VITE_CONVEX_URL;
	if (!CONVEX_URL) {
		throw new Error("missing VITE_CONVEX_URL envar");
	}
	const convex = new ConvexReactClient(CONVEX_URL, {
		unsavedChangesWarning: false,
	});
	const convexQueryClient = new ConvexQueryClient(convex);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
				gcTime: 5000,
			},
		},
	});
	convexQueryClient.connect(queryClient);

	// @snippet start example
	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			defaultPreload: "intent",
			scrollRestoration: true,
			defaultPreloadStaleTime: 0, // Let React Query handle all caching
			defaultErrorComponent: RootCatchBoundary,
			defaultNotFoundComponent: () => <NotFound />,
			context: { queryClient, convexClient: convex, convexQueryClient },
			Wrap: ({ children }) => (
				<ConvexProvider client={convexQueryClient.convexClient}>
					{children}
				</ConvexProvider>
			),
		}),
		queryClient,
	);

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
