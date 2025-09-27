import { Button } from "@/components/ui/button";
import { clickHandlers } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashboardContent } from "../components/dashboard-content";

export function DashboardView() {
	const navigate = useNavigate();

	return (
		<section className="container py-8 md:py-12">
			<div className="flex flex-row items-start justify-between pb-8">
				<div className="grid gap-1">
					<h1 className="font-bold text-2xl tracking-tight md:text-3xl">
						Dashboard
					</h1>
				</div>
				<Button asChild>
					<Link
						to="/dashboard"
						{...clickHandlers(() =>
							navigate({
								to: "/dashboard",
							}),
						)}
					>
						<Plus className="h-4 w-4" />
						New Countdown
					</Link>
				</Button>
			</div>

			<DashboardContent />
		</section>
	);
}
