import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/slow-route")({
	loader: async () => {
		await new Promise((resolve) => setTimeout(resolve, 5000));
	},
	pendingMs: 0, // Force immediate pending state
	pendingMinMs: 5000,
	pendingComponent: () => {
		return (
			<div
				style={{
					color: "red",
					fontSize: "24px",
					border: "2px solid red",
					padding: "20px",
					textAlign: "center",
				}}
			>
				LOADING SLOW ROUTE
			</div>
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl">Slow Route</h1>

			<Button asChild>
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
}
