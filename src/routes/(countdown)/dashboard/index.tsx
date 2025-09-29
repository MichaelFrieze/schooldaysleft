import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/dashboard/")({
	// loader: (opts) => {
	// 	opts.context.queryClient.prefetchQuery(
	// 		convexQuery(api.countdowns.getAll, {}),
	// 	);
	// },
	ssr: false,
	component: DashboardRoute,
});

function DashboardRoute() {
	return <DashboardView />;
}
