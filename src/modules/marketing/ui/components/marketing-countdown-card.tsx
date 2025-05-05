import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, School, Settings, Sun } from "lucide-react";

export const MarketingCountdownCard = () => {
  return (
    <Card className="border-border/40 from-background to-muted/20 hidden overflow-hidden rounded-xl border bg-gradient-to-br shadow-lg transition-shadow hover:shadow-xl lg:block">
      <CardContent className="p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full">
            <School className="text-primary h-8 w-8" />
          </div>

          <div className="text-muted-foreground hover:text-foreground h-8 w-8">
            <Settings className="h-4 w-4" />
          </div>
        </div>

        <div className="text-center">
          <div className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums md:text-9xl">
            15
          </div>
          <p className="text-muted-foreground mt-1 text-lg font-medium">
            days to go!
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground text-xs font-medium">
              Monday-Friday
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-amber-500" />
            <span className="text-muted-foreground text-xs font-medium">
              Weekends Off
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Progress value={87} className="h-2.5" />
        </div>
      </CardContent>
    </Card>
  );
};
