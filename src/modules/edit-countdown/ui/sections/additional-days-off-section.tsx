import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { FormData } from "@/modules/edit-countdown/hooks/use-countdown-form";
import { format, isSameMonth } from "date-fns";
import type { UseFormReturn } from "react-hook-form";

interface AdditionalDaysOffSectionProps {
  form: UseFormReturn<FormData>;
  startDate: Date;
  endDate: Date;
  additionalDaysOff: Date[];
  months: Date[];
  isWeeklyDayOff: (date: Date) => boolean;
}

export const AdditionalDaysOffSection = ({
  form,
  startDate,
  endDate,
  additionalDaysOff,
  months,
  isWeeklyDayOff,
}: AdditionalDaysOffSectionProps) => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Select specific dates that will be days off (holidays, breaks, etc.)
        </p>

        <FormField
          control={form.control}
          name="additionalDaysOff"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {months.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {months.map((month) => (
                      <div key={month.getTime()} className="space-y-2">
                        <div className="flex justify-center rounded-md border p-3">
                          <Calendar
                            mode="multiple"
                            month={month}
                            selected={field.value.filter((date) =>
                              isSameMonth(date, month),
                            )}
                            onSelect={(dates) => {
                              if (!dates) return;

                              const otherMonthDates = field.value.filter(
                                (date) => !isSameMonth(date, month),
                              );

                              field.onChange([...otherMonthDates, ...dates]);
                            }}
                            disabled={(date) =>
                              !isSameMonth(date, month) ||
                              isWeeklyDayOff(date) ||
                              date < startDate ||
                              date > endDate
                            }
                            modifiers={{
                              weeklyOff: isWeeklyDayOff,
                            }}
                            // modifiersClassNames={{
                            //   weeklyOff:
                            //     "opacity-50 bg-muted text-muted-foreground",
                            //   outside: "opacity-30 text-muted-foreground/50",
                            // }}
                            disableNavigation={true}
                            fixedWeeks={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {additionalDaysOff.length > 0 && (
          <div className="bg-muted rounded-md p-4">
            <p className="mb-2 text-sm font-medium">
              Selected additional days off ({additionalDaysOff.length} days):
            </p>
            <div className="text-muted-foreground max-h-32 overflow-y-auto text-sm">
              {additionalDaysOff
                .sort((a, b) => a.getTime() - b.getTime())
                .map((date) => format(date, "MMM d, yyyy"))
                .join(", ")}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
