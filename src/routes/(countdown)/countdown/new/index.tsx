import { NewCountdownView } from "@/modules/new-countdown/ui/views/new-countdown-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/countdown/new/")({
	head: () => ({
		meta: [
			{
				title: "Create Countdown | SchoolDaysLeft",
			},
		],
	}),
	ssr: false,
	component: NewCountdownRoute,
});

function NewCountdownRoute() {
	return <NewCountdownView />;
}
