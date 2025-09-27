import { buttonVariants } from "@/components/ui/button";
import { UserButton } from "@/components/ui/user-button";
import { clickHandlers, cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { UserCircleIcon } from "lucide-react";
import { CountdownNavDropdown } from "./countdown-nav-dropdown";

export function CountdownNavbar() {
	const navigate = useNavigate();

	return (
		<header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				<Link
					to="/dashboard"
					{...clickHandlers(() =>
						navigate({
							to: "/dashboard",
						}),
					)}
					className="group flex items-center gap-1"
				>
					<span className="font-bold text-2xl">
						<span className="text-primary">School</span>
						DaysLeft
					</span>
				</Link>

				<nav className="ml-auto flex items-center gap-2">
					<CountdownNavDropdown />

					<SignedIn>
						<UserButton />
					</SignedIn>

					<SignedOut>
						<Link
							to="/sign-in/$"
							{...clickHandlers(() =>
								navigate({
									to: "/sign-in/$",
								}),
							)}
							className={cn(
								buttonVariants({ variant: "default", size: "sm" }),
								"rounded-full",
							)}
						>
							<UserCircleIcon />
							Sign in
						</Link>
					</SignedOut>
				</nav>
			</div>
		</header>
	);
}
