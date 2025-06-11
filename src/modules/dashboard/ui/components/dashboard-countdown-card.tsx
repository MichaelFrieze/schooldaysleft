import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateCalendarDaysUntilStart } from "@/modules/countdown/lib/calculate-calendar-days-until-start";
import { calculateCountdownProgress } from "@/modules/countdown/lib/calculate-countdown-progress";
import { calculateDaysLeft } from "@/modules/countdown/lib/calculate-days-left";
import type { Countdown } from "@/modules/countdown/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface DashboardCountdownCardProps {
  countdown: Countdown;
}

export const DashboardCountdownCard = ({
  countdown,
}: DashboardCountdownCardProps) => {
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
    <Link
      href={`/countdown/${countdown.id}`}
      key={countdown.id}
      aria-label={`View countdown: ${countdown.name}`}
      className="group block"
    >
      <Card className="hover:bg-card/70 relative p-6">
        <ArrowUpRight className="text-muted-foreground/60 group-hover:text-muted-foreground absolute top-4 right-4 h-4 w-4" />

        <div className="space-y-6">
          <div>
            <h3 className="text-foreground/90 truncate text-lg font-medium">
              {countdown.name}
            </h3>
          </div>

          <div className="space-y-2 text-center">
            <div className="text-foreground text-5xl font-bold tabular-nums">
              {displayValue}
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {displayText}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={progressValue} className="h-1.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
