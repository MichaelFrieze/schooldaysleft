import { CountdownLayout } from "@/modules/countdown/ui/layouts/countdown-layout";
import { convexQuery } from "@convex-dev/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/(countdown)")({
	loader: (opts) => {
		opts.context.queryClient.prefetchQuery(
			convexQuery(api.countdowns.getAll, {}),
		);
	},
	ssr: false,
	component: CountdownLayoutRoute,
});

function CountdownLayoutRoute() {
	return (
		<CountdownLayout>
			<Outlet />
		</CountdownLayout>
	);
}
