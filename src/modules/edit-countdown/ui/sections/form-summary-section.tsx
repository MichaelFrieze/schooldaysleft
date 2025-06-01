import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Countdown } from "@/modules/countdown/types";
import type { FormData } from "@/modules/edit-countdown/hooks/use-countdown-form";
import { format, isSameDay } from "date-fns";
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

interface FormSummarySectionProps {
  form: UseFormReturn<FormData>;
  startDate: Date;
  endDate: Date;
  weeklyDaysOff: number[];
  additionalDaysOff: Date[];
  defaultCountdown: Countdown;
  handleReset: () => void;
  isSubmitting?: boolean;
}

const ValueComparison = ({
  title,
  oldValue,
  newValue,
  hasChanged,
}: {
  title: string;
  oldValue: string;
  newValue: string;
  hasChanged: boolean;
}) => (
  <div>
    <h3 className="font-medium">{title}</h3>
    {hasChanged ? (
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm line-through">{oldValue}</p>
        <p className="text-sm font-medium">
          <span className="text-primary">New:</span> {newValue}
        </p>
      </div>
    ) : (
      <p className="text-muted-foreground text-sm">{newValue}</p>
    )}
  </div>
);

export const FormSummarySection = ({
  form,
  startDate,
  endDate,
  weeklyDaysOff,
  additionalDaysOff,
  defaultCountdown,
  handleReset,
  isSubmitting = false,
}: FormSummarySectionProps) => {
  const formatWeeklyDaysOff = (days: number[]) => {
    return days.length > 0
      ? days
          .map(
            (dayValue) => DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label,
          )
          .join(", ")
      : "None selected";
  };

  const nameChanged = form.getValues("name") !== defaultCountdown.name;
  const startDateChanged = !isSameDay(
    startDate,
    new Date(defaultCountdown.startDate),
  );
  const endDateChanged = !isSameDay(
    endDate,
    new Date(defaultCountdown.endDate),
  );

  const sortedNewWeeklyDays = [...weeklyDaysOff].sort();
  const sortedOldWeeklyDays = [...defaultCountdown.weeklyDaysOff].sort();
  const weeklyDaysOffChanged =
    sortedNewWeeklyDays.length !== sortedOldWeeklyDays.length ||
    sortedNewWeeklyDays.some(
      (day, index) => day !== sortedOldWeeklyDays[index],
    );

  const newDayTimestamps = additionalDaysOff.map((d) => d.getTime()).sort();
  const oldDayTimestamps = defaultCountdown.additionalDaysOff
    .map((d) => d.getTime())
    .sort();
  const additionalDaysOffChanged =
    newDayTimestamps.length !== oldDayTimestamps.length ||
    newDayTimestamps.some(
      (timestamp, index) => timestamp !== oldDayTimestamps[index],
    );

  const hasChanges =
    nameChanged ||
    startDateChanged ||
    endDateChanged ||
    weeklyDaysOffChanged ||
    additionalDaysOffChanged;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <p className="text-muted-foreground text-sm">
          Review your countdown settings before saving changes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <ValueComparison
            title="Countdown Name"
            oldValue={defaultCountdown.name}
            newValue={form.getValues("name")}
            hasChanged={nameChanged}
          />

          <Separator />

          <ValueComparison
            title="School Year Period"
            oldValue={`${format(defaultCountdown.startDate, "MMMM d, yyyy")} - ${format(defaultCountdown.endDate, "MMMM d, yyyy")}`}
            newValue={`${format(startDate, "MMMM d, yyyy")} - ${format(endDate, "MMMM d, yyyy")}`}
            hasChanged={startDateChanged || endDateChanged}
          />

          <Separator />

          <ValueComparison
            title="Weekly Days Off"
            oldValue={formatWeeklyDaysOff(defaultCountdown.weeklyDaysOff)}
            newValue={formatWeeklyDaysOff(weeklyDaysOff)}
            hasChanged={weeklyDaysOffChanged}
          />

          <Separator />

          <ValueComparison
            title="Additional Days Off"
            oldValue={`${defaultCountdown.additionalDaysOff.length} additional days selected`}
            newValue={`${additionalDaysOff.length} additional days selected`}
            hasChanged={additionalDaysOffChanged}
          />
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset
          </Button>
          <Button type="submit" disabled={!hasChanges || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
