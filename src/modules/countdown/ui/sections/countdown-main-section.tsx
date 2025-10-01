import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Calendar } from "lucide-react";
import { Suspense } from "react";
import { calculateCalendarDaysUntilStart } from "../../lib/calculate-calendar-days-until-start";
import { calculateCountdownProgress } from "../../lib/calculate-countdown-progress";
import { calculateDaysLeft } from "../../lib/calculate-days-left";
import { calculateTotalDays } from "../../lib/calculate-total-days";

interface CountdownMainSectionProps {
	countdownId: string;
}

export function CountdownMainSection({
	countdownId,
}: CountdownMainSectionProps) {
	return (
		<Suspense fallback={<CountdownMainSectionLoading />}>
			<CountdownMainSectionSuspense countdownId={countdownId} />
		</Suspense>
	);
}

function CountdownMainSectionSuspense({
	countdownId,
}: CountdownMainSectionProps) {
	const { data: countdown } = useSuspenseQuery(
		convexQuery(api.countdowns.getById, {
			id: countdownId as Id<"countdowns">,
		}),
	);

	if (!countdown) {
		throw new Error("Countdown not found");
	}

	const daysLeft = calculateDaysLeft(countdown);
	const totalDays = calculateTotalDays(countdown);
	const daysCompleted = totalDays - daysLeft;
	const progressValue = calculateCountdownProgress(countdown);
	const daysUntilStart = calculateCalendarDaysUntilStart(countdown);

	const todayFormatted = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const isCountdownComplete = daysLeft === 0;
	const hasStarted = new Date() >= new Date(countdown.startDate);

	return (
		<section className="pb-8 md:pb-12">
			<Card>
				<CardContent className="p-8">
					<div className="pb-8">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span className="font-medium text-sm">{todayFormatted}</span>
						</div>
					</div>

					<div className="text-center">
						<div className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text font-extrabold text-8xl text-transparent tabular-nums">
							{!hasStarted ? daysUntilStart : daysLeft}
						</div>
						<p className="pt-2 font-medium text-muted-foreground text-xl">
							{isCountdownComplete
								? "All done! 🎉"
								: !hasStarted
									? daysUntilStart === 1
										? "day until start"
										: "days until start"
									: daysLeft === 1
										? "day left"
										: "days left"}
						</p>
					</div>

					<div className="pt-8">
						<div className="flex items-center justify-between pb-2">
							<span className="font-medium text-muted-foreground text-sm">
								Progress ({daysCompleted}/{totalDays} days)
							</span>
							<span className="font-medium text-muted-foreground text-sm">
								{Math.round(progressValue)}%
							</span>
						</div>
						<Progress value={progressValue} className="h-3" />
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

function CountdownMainSectionLoading() {
	return (
		<section className="pb-8 [animation:delayed-fade-in_.5s_ease-out] md:pb-12">
			<Card>
				<CardContent className="p-8">
					<div className="pb-8">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Skeleton className="h-4 w-4" />
							<Skeleton className="h-5 w-48" />
						</div>
					</div>

					<div className="text-center">
						<Skeleton className="mx-auto h-24 w-48" />
						<Skeleton className="mx-auto mt-2 h-7 w-36" />
					</div>

					<div className="pt-8">
						<div className="flex items-center justify-between pb-2">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-5 w-12" />
						</div>
						<Skeleton className="h-3 w-full" />
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
