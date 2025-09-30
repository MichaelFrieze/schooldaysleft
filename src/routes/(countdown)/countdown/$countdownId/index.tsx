import { CountdownView } from "@/modules/countdown/ui/views/countdown-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)/countdown/$countdownId/")({
	// loader: (opts) => {
	// 	opts.context.queryClient.prefetchQuery(
	// 		convexQuery(api.countdowns.getById, {
	// 			id: opts.params.countdownId as Id<"countdowns">,
	// 		}),
	// 	);
	// },
	ssr: false,
	component: CountdownRoute,
});

function CountdownRoute() {
	const { countdownId } = Route.useParams();

	return <CountdownView countdownId={countdownId} />;
}
