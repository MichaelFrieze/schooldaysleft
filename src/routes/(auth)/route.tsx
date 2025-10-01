import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	ssr: false,
	component: AuthLayoutRoute,
});

function AuthLayoutRoute() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
