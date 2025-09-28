import { CountdownView } from "@/modules/countdown/ui/views/countdown-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/countdown/$countdownId/")({
	component: CountdownRoute,
});

function CountdownRoute() {
	const { countdownId } = Route.useParams();

	return <CountdownView countdownId={countdownId} />;
}
