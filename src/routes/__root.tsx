import DevtoolsLoader from "@/components/devtools/devtools-loader";
import { RootCatchBoundary } from "@/components/errors/root-catch-boundary";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { seo } from "@/lib/seo";
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
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content:
					"width=device-width, initial-scale=1, user-scalable=yes, viewport-fit=cover",
			},
			{
				name: "theme-color",
				content: "#f5f5ff",
				media: "(prefers-color-scheme: light)",
			},
			{
				name: "theme-color",
				content: "#0f0f1a",
				media: "(prefers-color-scheme: dark)",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "SchoolDaysLeft",
			},
			{
				name: "mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default",
			},
			{
				name: "format-detection",
				content: "telephone=no,date=no,address=no,email=no,url=no",
			},
			{
				name: "application-name",
				content: "SchoolDaysLeft",
			},
			{
				title: "SchoolDaysLeft",
			},
			...seo({
				title: "SchoolDaysLeft",
				description:
					"Track the remaining school days with customizable start dates, end dates, and days off. Perfect for students, parents, and teachers.",
				image:
					"https://d54nslkxpa.ufs.sh/f/xWWrB0vOU3uQjPrQNDMOyA8cGm4UaHFVEQZIbKwdetkzloMW",
				keywords:
					"school days left, school countdown, days until school ends, last day of school countdown, academic calendar app, school calendar tracker, custom school calendar, track school days, semester countdown, school holiday tracker, days off planner, student planner, parent school tracker, teacher classroom tool, SchoolDaysLeft",
			}),
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{ rel: "manifest", href: "/site.webmanifest" },
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon-96x96.png",
				sizes: "96x96",
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
			{ rel: "shortcut icon", href: "/favicon.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
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
