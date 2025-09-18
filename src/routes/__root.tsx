import DevtoolsLoader from "@/components/devtools/devtools-loader";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { fetchClerkAuth } from "@/lib/fetch-clerk-auth";
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
	beforeLoad: async (ctx) => {
		let userId: string | null = null;

		// During SSR only (the only time serverHttpClient exists),
		if (ctx.context.convexQueryClient.serverHttpClient) {
			const auth = await fetchClerkAuth();
			const { token, userId: userIdFromClerk } = auth;

			if (token) {
				// set the Clerk auth token to make HTTP queries with.
				ctx.context.convexQueryClient.serverHttpClient.setAuth(token);
			}

			userId = userIdFromClerk;
		}

		return {
			userId,
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

	shellComponent: RootComponent,
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
