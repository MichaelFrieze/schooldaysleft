"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { calculateCountdownProgress } from "../../lib/calculate-countdown-progress";
import { calculateDaysLeft } from "../../lib/calculate-days-left";

interface CountdownMainSectionProps {
  countdownId: string;
}

export const CountdownMainSection = ({
  countdownId,
}: CountdownMainSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense>
        <CountdownMainSectionSuspense countdownId={countdownId} />
      </Suspense>
    </ErrorBoundary>
  );
};

// const CountdownMainSectionSkeleton = () => {
//   return <div className="pb-8 md:pb-12">loading...</div>;
// };

const CountdownMainSectionSuspense = ({
  countdownId,
}: CountdownMainSectionProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
  });

  const daysLeft = useMemo(() => calculateDaysLeft(countdown), [countdown]);
  const progressValue = useMemo(
    () => calculateCountdownProgress(countdown),
    [countdown],
  );

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
      <Card className="bg-background rounded-xl">
        <CardContent className="p-8">
          <div className="pb-8">
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{todayFormatted}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums">
              {daysLeft}
            </div>
            <p className="text-muted-foreground pt-2 text-xl font-medium">
              {isCountdownComplete
                ? "All done! 🎉"
                : !hasStarted
                  ? "days until start"
                  : daysLeft === 1
                    ? "day left!"
                    : "days left!"}
            </p>
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-between pb-2">
              <span className="text-muted-foreground text-sm font-medium">
                Progress
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
