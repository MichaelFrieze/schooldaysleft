import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col items-center justify-center h-screen font-sans">
			<h1>Hello World</h1>
			<Button variant="outline">Click me</Button>
		</div>
	);
}
