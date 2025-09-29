import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute(
	"/(countdown)/countdown/$countdownId/edit/",
)({
	loader: (opts) => {
		opts.context.queryClient.prefetchQuery(
			convexQuery(api.countdowns.getById, {
				id: opts.params.countdownId as Id<"countdowns">,
			}),
		);
	},
	ssr: false,
	component: EditCountdownRoute,
});

function EditCountdownRoute() {
	return <div>Hello "/(countdown)/countdown/$countdownId/edit/"!</div>;
}
