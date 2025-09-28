import * as TanstackQuery from "@/components/providers/query-provider";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
	MutationCache,
	QueryClient,
	notifyManager,
} from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexReactClient } from "convex/react";
import { NotFound } from "./components/errors/not-found";
import { RootCatchBoundary } from "./components/errors/root-catch-boundary";
import { env } from "./env";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	if (typeof document !== "undefined") {
		notifyManager.setScheduler(window.requestAnimationFrame);
	}

	const CONVEX_URL = env.VITE_CONVEX_URL;

	const convex = new ConvexReactClient(CONVEX_URL, {
		unsavedChangesWarning: false,
	});
	const convexQueryClient = new ConvexQueryClient(convex);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
		mutationCache: new MutationCache({
			onError: (error) => {
				console.error(error);
			},
		}),
	});

	convexQueryClient.connect(queryClient);

	const router = createTanstackRouter({
		routeTree,
		context: { queryClient, convexClient: convex, convexQueryClient },
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanstackQuery.Provider queryClient={queryClient}>
					{props.children}
				</TanstackQuery.Provider>
			);
		},
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultErrorComponent: RootCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
		wrapQueryClient: false,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
