import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DAYS_OF_WEEK } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import {
	eachMonthOfInterval,
	endOfMonth,
	format,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
} from "date-fns";
import {
	CalendarDays,
	CalendarIcon,
	Eye,
	EyeOff,
	Info,
	Sun,
} from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import { calculateCountdownProgress } from "../../lib/calculate-countdown-progress";
import { calculateDaysLeft } from "../../lib/calculate-days-left";
import { calculateTotalDays } from "../../lib/calculate-total-days";
import { calculateWeeksRemaining } from "../../lib/calculate-weeks-remaining";

interface CountdownDetailsSectionProps {
	countdownId: string;
}

export const CountdownDetailsSection = ({
	countdownId,
}: CountdownDetailsSectionProps) => {
	return (
		<Suspense fallback={<CountdownDetailsSectionLoading />}>
			<CountdownDetailsSectionSuspense countdownId={countdownId} />
		</Suspense>
	);
};

const CountdownDetailsSectionSuspense = ({
	countdownId,
}: CountdownDetailsSectionProps) => {
	const [showPastMonths, setShowPastMonths] = useState(false);

	const { data: countdown } = useSuspenseQuery(
		convexQuery(api.countdowns.getById, {
			id: countdownId as Id<"countdowns">,
		}),
	);

	if (!countdown) {
		throw new Error("Countdown not found");
	}

	const allAdditionalDaysOffDates = useMemo(
		() => countdown.additionalDaysOff.map((date) => new Date(date)),
		[countdown.additionalDaysOff],
	);

	const today = (() => {
		const date = new Date();
		date.setHours(0, 0, 0, 0);
		return date;
	})();

	const daysLeft = calculateDaysLeft(countdown);
	const totalDays = calculateTotalDays(countdown);
	const daysCompleted = totalDays - daysLeft;
	const progressPercentage = calculateCountdownProgress(countdown);
	const weeksRemaining = calculateWeeksRemaining(countdown);

	const totalCalendarDays = (() => {
		const startDate = new Date(countdown.startDate);
		const endDate = new Date(countdown.endDate);
		return (
			Math.ceil(
				(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
			) + 1
		);
	})();

	const startDate = new Date(countdown.startDate);
	const endDate = new Date(countdown.endDate);

	const upcomingAdditionalDaysOffDates = allAdditionalDaysOffDates
		.filter((date) => isSameDay(date, today) || isAfter(date, today))
		.sort((a, b) => a.getTime() - b.getTime());

	const numberOfRemainingAdditionalDaysOff =
		upcomingAdditionalDaysOffDates.length;

	const nextAdditionalDayOff =
		upcomingAdditionalDaysOffDates.length > 0
			? upcomingAdditionalDaysOffDates[0]
			: null;

	const allMonths = eachMonthOfInterval({
		start: startDate,
		end: endDate,
	});

	const months = showPastMonths
		? allMonths
		: allMonths.filter((month) => !isBefore(endOfMonth(month), today));

	const hasPastMonths = allMonths.some((month) =>
		isBefore(endOfMonth(month), today),
	);

	const isDateDisabled = (date: Date) => {
		if (showPastMonths) {
			if (isBefore(date, startDate) || isAfter(date, endDate)) {
				return true;
			}
		} else {
			if (isBefore(date, today) || isAfter(date, endDate)) {
				return true;
			}
		}

		const dayOfWeek = date.getDay();
		if (countdown.weeklyDaysOff.includes(dayOfWeek)) {
			return true;
		}

		return false;
	};

	return (
		<section className="pb-8 md:pb-12">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* Countdown Details */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CalendarIcon className="h-5 w-5" />
							Countdown Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<h4 className="font-medium">Start Date</h4>
								<p className="text-muted-foreground text-sm">
									{formatDate(countdown.startDate)}
								</p>
							</div>
							<div>
								<h4 className="font-medium">End Date</h4>
								<p className="text-muted-foreground text-sm">
									{formatDate(countdown.endDate)}
								</p>
							</div>
							<div>
								<h4 className="font-medium">Total School Days</h4>
								<p className="text-muted-foreground text-sm">
									{totalDays} days
								</p>
							</div>
							<div>
								<h4 className="font-medium">Days Completed</h4>
								<p className="text-muted-foreground text-sm">
									{daysCompleted} ({Math.round(progressPercentage)}%)
								</p>
							</div>
							<div>
								<h4 className="font-medium">Days Remaining</h4>
								<p className="text-muted-foreground text-sm">{daysLeft} days</p>
							</div>
							<div>
								<h4 className="font-medium">Weeks Remaining</h4>
								<p className="text-muted-foreground text-sm">
									{weeksRemaining} {weeksRemaining === 1 ? "week" : "weeks"}
								</p>
							</div>
							<div>
								<h4 className="font-medium">Calendar Duration</h4>
								<p className="text-muted-foreground text-sm">
									{totalCalendarDays} days
								</p>
							</div>
							<div>
								<h4 className="font-medium">Created</h4>
								<p className="text-muted-foreground text-sm">
									{format(new Date(countdown.createdAt), "MMM d, yyyy")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Weekly Schedule */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CalendarDays className="h-5 w-5" />
							Weekly Schedule
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{DAYS_OF_WEEK.map((day) => (
								<div
									key={day.value}
									className="flex items-center justify-between"
								>
									<span className="text-sm">{day.label}</span>
									<span
										className={`rounded-full px-2 py-1 text-xs ${
											countdown.weeklyDaysOff.includes(day.value)
												? "bg-accent/70 text-accent-foreground"
												: "bg-primary/70 text-primary-foreground"
										}`}
									>
										{countdown.weeklyDaysOff.includes(day.value)
											? "Off"
											: "School"}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2">
								<Sun className="h-5 w-5" />
								Holidays & Breaks ({numberOfRemainingAdditionalDaysOff})
							</CardTitle>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setShowPastMonths(!showPastMonths)}
								className="flex items-center gap-2"
								disabled={!hasPastMonths}
							>
								{showPastMonths ? (
									<>
										<EyeOff className="h-4 w-4" />
										<span className="hidden sm:block">Hide Past</span>
									</>
								) : (
									<>
										<Eye className="h-4 w-4" />
										<span className="hidden sm:block">Show All</span>
									</>
								)}
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						{nextAdditionalDayOff ? (
							<div className="flex items-center gap-3 rounded-lg border bg-accent p-3 text-accent-foreground text-sm">
								<Info className="h-5 w-5 flex-shrink-0" />
								<div className="font-medium">
									{isSameDay(nextAdditionalDayOff, today)
										? "Today is a holiday or break!"
										: `Next up: ${format(
												nextAdditionalDayOff,
												"EEEE, MMM d, yyyy",
											)}`}
								</div>
							</div>
						) : (
							<div className="flex items-center gap-3 rounded-lg border bg-accent p-3 text-accent-foreground text-sm">
								<Info className="h-5 w-5 flex-shrink-0" />
								<div className="font-medium">
									No more holidays or breaks scheduled.
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{months.map((month) => (
								<div key={month.getTime()} className="space-y-2">
									<div className="flex justify-center rounded-md border p-3">
										<Calendar
											mode="multiple"
											month={month}
											selected={(showPastMonths
												? allAdditionalDaysOffDates
												: upcomingAdditionalDaysOffDates
											).filter((date) => isSameMonth(date, month))}
											disabled={(date) =>
												!isSameMonth(date, month) || isDateDisabled(date)
											}
											disableNavigation={true}
											fixedWeeks={true}
											classNames={{
												day_selected: "bg-primary text-primary-foreground",
												day: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 size-8 p-0 font-normal aria-selected:opacity-100",
												day_outside:
													"text-muted-foreground aria-selected:text-primary-foreground",
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

const CountdownDetailsSectionLoading = () => {
	return (
		<section className="pb-8 [animation:delayed-fade-in_.5s_ease-out] md:pb-12">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* Countdown Details Skeleton */}
				<Card>
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-5 w-48" />
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Skeleton className="mb-2 h-5 w-24" />
							<Skeleton className="h-4 w-40" />
						</div>
						<Separator />
						<div>
							<Skeleton className="mb-2 h-5 w-20" />
							<Skeleton className="h-4 w-40" />
						</div>
						<Separator />
						<div>
							<Skeleton className="mb-2 h-5 w-24" />
							<Skeleton className="h-4 w-40" />
						</div>
					</CardContent>
				</Card>

				{/* Weekly Schedule Skeleton */}
				<Card>
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-5 w-56" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{DAYS_OF_WEEK.map((day) => (
								<div
									key={day.value}
									className="flex items-center justify-between"
								>
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-6 w-16 rounded-full" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Additional Days Off Skeleton */}
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-5 w-72" />
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<Skeleton className="h-4 w-lg" />
						{/* <Skeleton className="mx-auto h-80 w-full max-w-sm rounded-lg" /> */}
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
