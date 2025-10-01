import { clickHandlers } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";

export function AuthNavbar() {
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
			</div>
		</header>
	);
}
