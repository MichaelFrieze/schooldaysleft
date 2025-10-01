import { EditCountdownView } from "@/modules/edit-countdown/ui/views/edit-countdown-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(countdown)/countdown/$countdownId/edit/",
)({
	ssr: false,
	component: EditCountdownRoute,
});

function EditCountdownRoute() {
	const { countdownId } = Route.useParams();

	return <EditCountdownView countdownId={countdownId} />;
}
