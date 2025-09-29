import { CountdownLayout } from "@/modules/countdown/ui/layouts/countdown-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(countdown)")({
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
