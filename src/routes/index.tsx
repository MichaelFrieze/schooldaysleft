import { Button } from "@/components/ui/button";
import { ModeToggleBtn } from "@/components/ui/mode-toggle";
import { clickHandlers } from "@/lib/utils";
import {
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/tanstack-react-start";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const navigate = useNavigate();

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1>Hello World</h1>
			<ModeToggleBtn />

			<SignedIn>
				<p>You are signed in</p>
				<SignOutButton />
				<UserButton />
			</SignedIn>
			<SignedOut>
				<Button asChild>
					<Link
						to="/sign-in/$"
						{...clickHandlers(() =>
							navigate({
								to: "/sign-in/$",
							}),
						)}
					>
						Sign In
					</Link>
				</Button>
				<p>You are signed out</p>
			</SignedOut>
		</div>
	);
}
