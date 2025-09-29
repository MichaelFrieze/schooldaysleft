import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in/$")({
	ssr: false,
	component: SignInRoute,
});

function SignInRoute() {
	return <SignInView />;
}
