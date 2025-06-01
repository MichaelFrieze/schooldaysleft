import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { FormData } from "@/modules/new-countdown/hooks/use-countdown-form";
import type { UseFormReturn } from "react-hook-form";

const DAYS_OF_WEEK = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

interface WeeklyDaysOffSectionProps {
  form: UseFormReturn<FormData>;
  weeklyDaysOff: number[];
  onWeeklyDayToggle: (dayValue: number) => void;
}

export const WeeklyDaysOffSection = ({
  form,
  weeklyDaysOff,
  onWeeklyDayToggle,
}: WeeklyDaysOffSectionProps) => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-center text-sm leading-relaxed">
          Select the days of the week that are always off (like weekends)
        </p>

        <FormField
          control={form.control}
          name="weeklyDaysOff"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-wrap justify-center gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <Button
                      key={day.value}
                      type="button"
                      variant={
                        weeklyDaysOff.includes(day.value)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className={cn(
                        "min-w-[60px] rounded-full px-4 py-2",
                        weeklyDaysOff.includes(day.value)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-muted",
                      )}
                      onClick={() => onWeeklyDayToggle(day.value)}
                    >
                      {day.label.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {weeklyDaysOff.length > 0 && (
          <div className="bg-muted/50 border-muted space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full"></div>
              <p className="text-sm font-medium">
                {weeklyDaysOff.length} day
                {weeklyDaysOff.length !== 1 ? "s" : ""} selected
              </p>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              {weeklyDaysOff
                .map(
                  (dayValue) =>
                    DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label,
                )
                .join(", ")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
