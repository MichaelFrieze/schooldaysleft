import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/dashboard/")({
	component: DashboardRoute,
});

function DashboardRoute() {
	return <DashboardView />;
}
