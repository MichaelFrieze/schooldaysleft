import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import { DatePickerField } from "@/modules/new-countdown/ui/components/form-fields/date-picker-field";
import type { FormData } from "@/modules/new-countdown/hooks/use-countdown-form";

interface BasicDetailsSectionProps {
  form: UseFormReturn<FormData>;
  startDate?: Date;
}

export const BasicDetailsSection = ({
  form,
  startDate,
}: BasicDetailsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Year Details</CardTitle>
        <p className="text-muted-foreground text-sm">
          Enter the basic information for your countdown
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Countdown Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2024-2025 School Year" {...field} />
              </FormControl>
              <FormDescription>
                Enter a descriptive name for your countdown
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <DatePickerField
                  field={field}
                  placeholder="Select start date"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <DatePickerField
                  field={field}
                  placeholder="Select end date"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return true;
                    if (startDate) {
                      return date <= startDate;
                    }
                    return false;
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
