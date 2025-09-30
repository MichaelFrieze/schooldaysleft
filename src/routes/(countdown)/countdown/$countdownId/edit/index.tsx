import { EditCountdownView } from "@/modules/edit-countdown/ui/views/edit-countdown-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(countdown)/countdown/$countdownId/edit/",
)({
	// loader: (opts) => {
	// 	opts.context.queryClient.prefetchQuery(
	// 		convexQuery(api.countdowns.getById, {
	// 			id: opts.params.countdownId as Id<"countdowns">,
	// 		}),
	// 	);
	// },
	ssr: false,
	component: EditCountdownRoute,
});

function EditCountdownRoute() {
	const { countdownId } = Route.useParams();

	return <EditCountdownView countdownId={countdownId} />;
}
