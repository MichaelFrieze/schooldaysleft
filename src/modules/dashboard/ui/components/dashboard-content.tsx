import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { clickHandlers } from "@/lib/utils";
import { convexQuery } from "@convex-dev/react-query";
import {
	useQueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { AlertTriangle, CalendarDays, Plus } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { DashboardCountdownCard } from "./dashboard-countdown-card";

export function DashboardContent() {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary FallbackComponent={DashboardError} onReset={reset}>
			<Suspense fallback={<DashboardContentLoading />}>
				<DashboardContentSuspense />
				<br />
				<DashboardContentLoading />
			</Suspense>
		</ErrorBoundary>
	);
}

export function DashboardContentSuspense() {
	const navigate = useNavigate();
	const { data: countdowns } = useSuspenseQuery(
		convexQuery(api.countdowns.getAll, {}),
	);

	if (countdowns.length === 0) {
		return (
			<div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
				<CalendarDays className="mb-4 h-12 w-12 text-muted-foreground" />
				<h3 className="mb-2 font-medium text-lg">No Countdowns Yet</h3>
				<p className="max-w-sm text-muted-foreground text-sm">
					Create your first countdown to track the days left until your next
					break or the end of the school year.
				</p>
				<Button asChild variant="outline" className="mt-6">
					<Link
						to="/countdown/new"
						{...clickHandlers(() =>
							navigate({
								to: "/countdown/new",
							}),
						)}
					>
						<Plus className="mr-2 h-4 w-4" />
						Create Your First Countdown
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{countdowns.map((countdown) => {
				return (
					<DashboardCountdownCard key={countdown._id} countdown={countdown} />
				);
			})}
		</div>
	);
}

function DashboardCountdownCardSkeleton() {
	return (
		<Card className="relative p-6">
			<Skeleton className="absolute top-4 right-4 h-4 w-4 rounded-md" />
			<div className="space-y-6">
				<div>
					<Skeleton className="h-7 w-3/4 rounded-md" />
				</div>
				<div className="space-y-2">
					<Skeleton className="mx-auto h-12 w-30 rounded-md" />
					<Skeleton className="mx-auto h-5 w-30 rounded-md" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-1.5 w-full rounded-full" />
				</div>
			</div>
		</Card>
	);
}

function DashboardContentLoading() {
	return (
		<div className="grid grid-cols-1 gap-6 [animation:delayed-fade-in_.5s_ease-out] sm:grid-cols-2 lg:grid-cols-3">
			<DashboardCountdownCardSkeleton />
			<DashboardCountdownCardSkeleton />
			<DashboardCountdownCardSkeleton />
		</div>
	);
}

function DashboardError({ resetErrorBoundary }: FallbackProps) {
	return (
		<div
			className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
			role="alert"
		>
			<AlertTriangle className="mb-4 h-12 w-12 text-destructive" />
			<h3 className="mb-2 font-medium text-lg">Something went wrong</h3>
			<p className="max-w-sm text-muted-foreground text-sm">
				There was an issue loading your dashboard. Please try again.
			</p>
			<Button onClick={resetErrorBoundary} variant="outline" className="mt-6">
				Try Again
			</Button>
		</div>
	);
}
