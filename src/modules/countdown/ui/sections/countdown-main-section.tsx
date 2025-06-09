"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { Suspense } from "react";
import { calculateCalendarDaysUntilStart } from "../../lib/calculate-calendar-days-until-start";
import { calculateCountdownProgress } from "../../lib/calculate-countdown-progress";
import { calculateDaysLeft } from "../../lib/calculate-days-left";
import { calculateTotalDays } from "../../lib/calculate-total-days";

interface CountdownMainSectionProps {
  countdownId: string;
}

export const CountdownMainSection = ({
  countdownId,
}: CountdownMainSectionProps) => {
  return (
    <Suspense fallback={<CountdownMainSectionLoading />}>
      <CountdownMainSectionSuspense countdownId={countdownId} />
    </Suspense>
  );
};

const CountdownMainSectionSuspense = ({
  countdownId,
}: CountdownMainSectionProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
    retry: false,
  });

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
      <Card className="bg-background">
        <CardContent className="p-8">
          <div className="pb-8">
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{todayFormatted}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums">
              {!hasStarted ? daysUntilStart : daysLeft}
            </div>
            <p className="text-muted-foreground pt-2 text-xl font-medium">
              {isCountdownComplete
                ? "All done! 🎉"
                : !hasStarted
                  ? daysUntilStart === 1
                    ? "day until start"
                    : "days until start"
                  : daysLeft === 1
                    ? "day left!"
                    : "days left!"}
            </p>
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-between pb-2">
              <span className="text-muted-foreground text-sm font-medium">
                Progress ({daysCompleted}/{totalDays} days)
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                {Math.round(progressValue)}%
              </span>
            </div>
            <Progress value={progressValue} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const CountdownMainSectionLoading = () => {
  return (
    <section className="[animation:delayed-fade-in_.5s_ease-out] pb-8 md:pb-12">
      <Card className="bg-background rounded-xl">
        <CardContent className="p-8">
          <div className="pb-8">
            <div className="text-muted-foreground flex items-center gap-2">
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
};
