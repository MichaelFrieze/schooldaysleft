import { countdownsQueryOptions } from "@/modules/countdown/lib/countdowns-query-options";
import { CountdownLayout } from "@/modules/countdown/ui/layouts/countdown-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)")({
	loader: (opts) => {
		opts.context.queryClient.prefetchQuery(countdownsQueryOptions());
	},
	ssr: false,
	component: CountdownLayoutRoute,
});

function CountdownLayoutRoute() {
	return (
		<CountdownLayout>
			<Outlet />
		</CountdownLayout>
	);
}
