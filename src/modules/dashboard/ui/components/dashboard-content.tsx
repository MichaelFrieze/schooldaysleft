"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/react";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AlertTriangle, CalendarDays, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { DashboardCountdownCard } from "./dashboard-countdown-card";

export const DashboardContent = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={DashboardError} onReset={reset}>
      <Suspense fallback={<DashboardContentLoading />}>
        <DashboardContentSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

const DashboardContentSuspense = () => {
  const trpc = useTRPC();

  const { data: countdowns } = useSuspenseQuery({
    ...trpc.countdown.getAll.queryOptions(),
    retry: false,
  });

  if (countdowns.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <CalendarDays className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-medium">No Countdowns Yet</h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Create your first countdown to track the days left until your next
          break or the end of the school year.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/countdown/new">
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
          <DashboardCountdownCard
            key={countdown._id}
            countdown={{ ...countdown, id: countdown._id as string }}
          />
        );
      })}
    </div>
  );
};

const DashboardCountdownCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="truncate text-lg font-medium">
          <Skeleton className="h-5 w-3/4 rounded-md" />
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-sm font-medium">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-full rounded-md" />
      </CardContent>
    </Card>
  );
};

export const DashboardContentLoading = () => {
  return (
    <div className="grid [animation:delayed-fade-in_.5s_ease-out] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DashboardCountdownCardSkeleton />
      <DashboardCountdownCardSkeleton />
      <DashboardCountdownCardSkeleton />
    </div>
  );
};

const DashboardError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
      role="alert"
    >
      <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-medium">Something went wrong</h3>
      <p className="text-muted-foreground max-w-sm text-sm">
        There was an issue loading your dashboard. Please try again.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" className="mt-6">
        Try Again
      </Button>
    </div>
  );
};
