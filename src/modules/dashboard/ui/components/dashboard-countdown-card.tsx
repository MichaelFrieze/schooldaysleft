import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface DashboardCountdownCardProps {
  id: string;
  name: string;
  endDate: Date;
  progressValue: number;
}

export const DashboardCountdownCard = ({
  id,
  name,
  endDate,
  progressValue,
}: DashboardCountdownCardProps) => {
  return (
    <Link
      href={`/countdown/${id}`}
      key={id}
      aria-label={`View countdown: ${name}`}
    >
      <Card className="hover:bg-card/50 h-full overflow-hidden hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="truncate text-lg font-medium">{name}</CardTitle>
          {endDate && (
            <CardDescription className="text-muted-foreground/90 flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Ends on: {formatDate(endDate)}
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
