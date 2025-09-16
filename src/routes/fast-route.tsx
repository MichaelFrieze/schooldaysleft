import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fast-route")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl">Fast Route</h1>

			<Button asChild>
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
}
