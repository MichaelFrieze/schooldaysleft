import { Button } from "@/components/ui/button";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ context }) => {
		const { userId } = context;

		if (!userId) {
			throw redirect({
				to: "/sign-in/$",
				throw: true,
			});
		}
	},
	errorComponent: ({ error }) => {
		if (error.message === "Not authenticated") {
			return (
				<div className="flex flex-col items-center justify-center gap-2 p-12">
					<h1 className="text-4xl">Not authenticated</h1>
					<p>You need to be authenticated to access this route</p>
					<Button asChild>
						<Link to="/">Go to home</Link>
					</Button>
					<Button asChild>
						<Link to="/sign-in/$">Sign in</Link>
					</Button>
				</div>
			);
		}

		throw error;
	},
});
