import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "@/modules/new-countdown/hooks/use-countdown-form";
import { Loader2 } from "lucide-react";

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
  onClear: () => void;
  isSubmitting: boolean;
}

export const FormSummarySection = ({
  form,
  startDate,
  endDate,
  weeklyDaysOff,
  additionalDaysOff,
  onClear,
  isSubmitting,
}: FormSummarySectionProps) => {
  const handleClearWithConfirmation = () => {
    if (confirm("Are you sure you want to clear this form?")) {
      onClear();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <p className="text-muted-foreground text-sm">
          Review your countdown settings before creating
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Countdown Name</h3>
            <p className="text-muted-foreground text-sm">
              {form.getValues("name")}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">School Year Period</h3>
            <p className="text-muted-foreground text-sm">
              {format(startDate, "MMMM d, yyyy")} -{" "}
              {format(endDate, "MMMM d, yyyy")}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">Weekly Days Off</h3>
            <p className="text-muted-foreground text-sm">
              {weeklyDaysOff.length > 0
                ? weeklyDaysOff
                    .map(
                      (dayValue) =>
                        DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label,
                    )
                    .join(", ")
                : "None selected"}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">Additional Days Off</h3>
            <p className="text-muted-foreground text-sm">
              {additionalDaysOff.length} additional days selected
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleClearWithConfirmation}
            className="flex-1 sm:flex-none"
          >
            Clear All
          </Button>

          <Button type="submit" disabled={isSubmitting} className="sm:w-40">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Countdown"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
