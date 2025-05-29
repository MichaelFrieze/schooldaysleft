import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { calculateCountdownProgress } from "@/modules/countdown/lib/calculate-countdown-progress";
import type { Countdown } from "@/modules/countdown/types";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface DashboardCountdownCardProps {
  countdown: Countdown;
}

export const DashboardCountdownCard = ({
  countdown,
}: DashboardCountdownCardProps) => {
  const progressValue = calculateCountdownProgress(countdown);

  return (
    <Link
      href={`/countdown/${countdown.id}`}
      key={countdown.id}
      aria-label={`View countdown: ${countdown.name}`}
    >
      <Card className="hover:bg-card/50 h-full overflow-hidden hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="truncate text-lg font-medium">
            {countdown.name}
          </CardTitle>
          {countdown.endDate && (
            <CardDescription className="text-muted-foreground/90 flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Ends on: {formatDate(countdown.endDate)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Progress value={progressValue} className="h-3" />
        </CardContent>
      </Card>
    </Link>
  );
};
