import DevtoolsLoader from "@/components/devtools/devtools-loader";
import { RootCatchBoundary } from "@/components/errors/root-catch-boundary";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { tryCatch } from "@/lib/try-catch";
import { fetchClerkAuth } from "@/modules/auth/server/server-fns";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useRouteContext,
} from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async (opts) => {
		const { data, error } = await tryCatch(fetchClerkAuth());

		if (error) {
			return { error };
		}

		const { token, userId } = data;

		if (token) {
			// During SSR only (the only time serverHttpClient exists),
			// set the Clerk auth token to make HTTP queries with.
			opts.context.convexQueryClient.serverHttpClient?.setAuth(token);
		}

		return {
			userId,
			token,
		};
	},
	loader: ({ context }) => {
		if (context.error) {
			throw new Error("An unexpected error occurred in the root loader");
		}

		const { userId, token } = context;

		return {
			userId,
			token,
		};
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	errorComponent: (props) => (
		<RootDocument>
			<RootCatchBoundary {...props} />
		</RootDocument>
	),
	component: RootComponent,
});

function RootComponent() {
	const context = useRouteContext({ from: Route.id });
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
				<RootDocument>
					<Outlet />
				</RootDocument>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider
					defaultTheme="system"
					storageKey="schooldaysleft.theme"
					enableColorScheme
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<DevtoolsLoader />
				<Scripts />
			</body>
		</html>
	);
}
