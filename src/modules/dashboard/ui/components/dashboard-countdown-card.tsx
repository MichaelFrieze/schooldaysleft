import { Card } from "@/components/ui/card";
import { FastLink } from "@/components/ui/fast-link";
import { Progress } from "@/components/ui/progress";
import { calculateCalendarDaysUntilStart } from "@/modules/countdown/lib/calculate-calendar-days-until-start";
import { calculateCountdownProgress } from "@/modules/countdown/lib/calculate-countdown-progress";
import { calculateDaysLeft } from "@/modules/countdown/lib/calculate-days-left";
import type { Doc } from "convex/_generated/dataModel";
import { ArrowUpRight } from "lucide-react";

interface DashboardCountdownCardProps {
	countdown: Doc<"countdowns">;
}

export function DashboardCountdownCard({
	countdown,
}: DashboardCountdownCardProps) {
	const progressValue = calculateCountdownProgress(countdown);
	const daysLeft = calculateDaysLeft(countdown);
	const daysUntilStart = calculateCalendarDaysUntilStart(countdown);

	const hasStarted = daysUntilStart === 0;
	const isFinished = hasStarted && daysLeft === 0;

	const displayValue = hasStarted ? daysLeft : daysUntilStart;
	const displayText = isFinished
		? "All done! 🎉"
		: hasStarted
			? `day${daysLeft === 1 ? "" : "s"} left`
			: `day${daysUntilStart === 1 ? "" : "s"} until start`;

	return (
		<FastLink
			to="/countdown/$countdownId"
			params={{
				countdownId: countdown._id,
			}}
			aria-label={`View countdown: ${countdown.name}`}
			className="group block"
		>
			<Card className="relative p-6 hover:bg-card/70">
				<ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground" />

				<div className="space-y-6">
					<div>
						<h3 className="truncate font-medium text-foreground/90 text-lg">
							{countdown.name}
						</h3>
					</div>

					<div className="space-y-2 text-center">
						<div className="font-bold text-5xl text-foreground tabular-nums">
							{displayValue}
						</div>
						<p className="font-medium text-muted-foreground text-sm">
							{displayText}
						</p>
					</div>

					<div className="space-y-2">
						<Progress value={progressValue} className="h-1.5" />
					</div>
				</div>
			</Card>
		</FastLink>
	);
}
