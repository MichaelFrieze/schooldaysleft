import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { getAuth } from "@clerk/tanstack-react-start/server";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import type { ConvexReactClient } from "convex/react";
import TanStackQueryDevtools from "../components/devtools/query-devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
	const { userId, getToken } = await getAuth(getWebRequest());
	const token = await getToken({ template: "convex" });

	return {
		userId,
		token,
	};
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		const { userId, token } = await fetchClerkAuth();

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

	shellComponent: RootComponent,
});

function RootComponent() {
	return (
		<ClerkProvider>
			<RootDocument>
				<Outlet />
			</RootDocument>
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
				<TanstackDevtools
					config={{
						position: "bottom-left",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
