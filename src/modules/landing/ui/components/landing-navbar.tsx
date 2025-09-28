import { buttonVariants } from "@/components/ui/button";
import { UserButton } from "@/components/ui/user-button";
import { clickHandlers, cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { UserCircleIcon } from "lucide-react";

export function LandingNavbar() {
	const navigate = useNavigate();

	return (
		<header>
			<div className="container flex h-16 items-center">
				<Link
					to="/"
					{...clickHandlers(() =>
						navigate({
							to: "/",
						}),
					)}
					className="group flex items-center gap-1"
				>
					<span className="font-bold text-2xl">
						<span className="text-primary">School</span>
						DaysLeft
					</span>
				</Link>

				<nav className="ml-auto">
					<SignedIn>
						<div className="flex items-center gap-1">
							<Link
								to="/dashboard"
								{...clickHandlers(() =>
									navigate({
										to: "/dashboard",
									}),
								)}
								className={cn(
									buttonVariants({ variant: "link" }),
									"hidden text-foreground lg:flex",
								)}
							>
								Dashboard
							</Link>
							<UserButton />
						</div>
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
