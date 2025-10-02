import { LandingView } from "@/modules/landing/ui/views/landing-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)/")({
	head: () => ({
		meta: [
			{
				title: "Home | SchoolDaysLeft",
			},
		],
	}),
	component: LandingRoute,
});

function LandingRoute() {
	return <LandingView />;
}
