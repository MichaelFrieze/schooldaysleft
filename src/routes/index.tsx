import { Button } from "@/components/ui/button";
import { ModeToggleBtn } from "@/components/ui/mode-toggle";
import { clickHandlers } from "@/lib/utils";
import {
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/tanstack-react-start";
import {
	Link,
	createFileRoute,
	useLoaderData,
	useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: ({ context }) => {
		const userId = context.userId;
		return {
			userId,
		};
	},
	component: App,
});

function App() {
	const { userId } = useLoaderData({ from: "/" });
	const navigate = useNavigate();
	console.log(userId);

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1>Hello World</h1>
			<Button asChild>
				<Link to="/slow-route">Slow Route</Link>
			</Button>
			<Button asChild>
				<Link to="/auth-route">Auth Route</Link>
			</Button>
			<Button asChild>
				<Link
					to="/auth-route"
					{...clickHandlers(() =>
						navigate({
							to: "/auth-route",
						}),
					)}
				>
					Mouse Down Auth Route
				</Link>
			</Button>

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
