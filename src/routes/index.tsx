import { Button } from "@/components/ui/button";
import { ModeToggleBtn } from "@/components/ui/mode-toggle";
import { fetchClerkAuth } from "@/lib/fetch-clerk-auth";
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
	redirect,
	useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: async ({ context }) => {
		// During SSR only (the only time serverHttpClient exists),
		if (context.convexQueryClient.serverHttpClient) {
			const { userId } = context;
			console.log("userId in beforeLoad in index during SSR", userId);

			if (userId) {
				throw redirect({
					to: "/convex-route",
					throw: true,
				});
			}

			return;
		}

		const auth = await fetchClerkAuth();
		const { userId } = auth;

		console.log("calling beforeLoad in index during CSR", userId);

		if (userId) {
			throw redirect({
				to: "/convex-route",
				throw: true,
			});
		}

		return;
	},
	component: App,
});

function App() {
	const navigate = useNavigate();

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1>Hello World</h1>
			<Button asChild>
				<Link to="/slow-route">Slow Route</Link>
			</Button>
			<Button asChild>
				<Link to="/fast-route">Fast Route</Link>
			</Button>
			<Button asChild>
				<Link
					to="/fast-route"
					{...clickHandlers(() =>
						navigate({
							to: "/fast-route",
						}),
					)}
				>
					Mouse Down Fast Route
				</Link>
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
			<Button asChild>
				<Link
					to="/convex-route"
					{...clickHandlers(() =>
						navigate({
							to: "/convex-route",
						}),
					)}
				>
					Mouse Down Authed Convex Route
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
