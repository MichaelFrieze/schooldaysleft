import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/(countdown)/dashboard/")({
	loader: (opts) => {
		opts.context.queryClient.prefetchQuery(
			convexQuery(api.countdowns.getAll, {}),
		);
	},
	ssr: false,
	component: DashboardRoute,
});

function DashboardRoute() {
	return <DashboardView />;
}
