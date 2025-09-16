import { Button } from "@/components/ui/button";
import { ModeToggleBtn } from "@/components/ui/mode-toggle";
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1>Hello World</h1>
			<Button variant="outline">Click me</Button>
			<ModeToggleBtn />
			<SignedIn>
				<p>You are signed in</p>
				<SignOutButton />
				<UserButton />
			</SignedIn>
			<SignedOut>
				<p>You are signed out</p>
				<SignInButton />
			</SignedOut>
		</div>
	);
}
