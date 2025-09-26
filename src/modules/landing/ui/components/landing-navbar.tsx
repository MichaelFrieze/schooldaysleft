import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/ui/user-button";
import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { UserCircleIcon } from "lucide-react";

export function LandingNavbar() {
	return (
		<header>
			<div className="container flex h-16 items-center">
				<Link to="/" className="group flex items-center gap-1">
					<span className="font-bold text-2xl">
						<span className="text-primary">School</span>
						DaysLeft
					</span>
				</Link>

				<nav className="ml-auto">
					<SignedIn>
						<UserButton />
					</SignedIn>

					<SignedOut>
						<Button
							asChild
							variant="default"
							size="sm"
							className="rounded-full"
						>
							<Link to="/sign-in/$">
								<UserCircleIcon />
								Sign in
							</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</header>
	);
}
