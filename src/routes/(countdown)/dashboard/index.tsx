import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/dashboard/")({
	component: DashboardRoute,
});

function DashboardRoute() {
	return <div>Hello "/(countdown)/dashboard/"!</div>;
}
