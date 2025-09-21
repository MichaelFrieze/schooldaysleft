import { LandingLayout } from "@/modules/landing/ui/layouts/landing-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(landing)")({
	component: LandingLayoutRoute,
});

function LandingLayoutRoute() {
	return (
		<LandingLayout>
			<Outlet />
		</LandingLayout>
	);
}
