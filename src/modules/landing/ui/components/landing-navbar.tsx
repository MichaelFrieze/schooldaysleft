import { Button } from "@/components/ui/button";
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
					<Button
						asChild
						variant="default"
						className="h-8 rounded-full font-medium text-sm shadow-none"
					>
						<Link to="/sign-in/$">
							<UserCircleIcon />
							Sign in
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}
