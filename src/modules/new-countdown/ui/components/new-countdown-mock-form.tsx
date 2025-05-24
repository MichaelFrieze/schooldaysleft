"use client";

import { useState } from "react";
import { addMonths, format, isSameMonth, startOfMonth, getDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  createCountdown,
  calculateSchoolDaysRemaining,
} from "../server/mock-data";

interface CountdownFormData {
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  weeklyDaysOff: number[]; // 0 = Sunday, 1 = Monday, etc.
  additionalDaysOff: Date[];
}

const DAYS_OF_WEEK = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export const NewCountdownMockForm = () => {
  const [formData, setFormData] = useState<CountdownFormData>({
    name: "",
    startDate: undefined,
    endDate: undefined,
    weeklyDaysOff: [0, 6], // Default to Sunday and Saturday
    additionalDaysOff: [],
  });

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // Generate months between start and end date
  const getMonthsBetweenDates = (start: Date, end: Date): Date[] => {
    const months: Date[] = [];
    let current = startOfMonth(start);
    const endMonth = startOfMonth(end);

    while (current <= endMonth) {
      months.push(current);
      current = addMonths(current, 1);
    }

    return months;
  };

  const months =
    formData.startDate && formData.endDate
      ? getMonthsBetweenDates(formData.startDate, formData.endDate)
      : [];

  // Check if a date should be disabled (is a weekly day off)
  const isWeeklyDayOff = (date: Date): boolean => {
    return formData.weeklyDaysOff.includes(getDay(date));
  };

  // Handle weekly days off selection
  const handleWeeklyDayToggle = (dayValue: number) => {
    setFormData((prev) => ({
      ...prev,
      weeklyDaysOff: prev.weeklyDaysOff.includes(dayValue)
        ? prev.weeklyDaysOff.filter((d) => d !== dayValue)
        : [...prev.weeklyDaysOff, dayValue],
    }));
  };

  // Clear all form data
  const handleClear = () => {
    setFormData({
      name: "",
      startDate: undefined,
      endDate: undefined,
      weeklyDaysOff: [0, 6],
      additionalDaysOff: [],
    });
  };

  // Create countdown (mock implementation)
  const handleCreateCountdown = () => {
    if (!formData.startDate || !formData.endDate || !formData.name.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const countdown = createCountdown({
        name: formData.name.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        weeklyDaysOff: formData.weeklyDaysOff,
        additionalDaysOff: formData.additionalDaysOff,
      });

      const daysRemaining = calculateSchoolDaysRemaining(countdown);

      alert(
        `Countdown "${countdown.name}" created successfully! ${daysRemaining} school days remaining.`,
      );

      // Reset form
      handleClear();
    } catch (error) {
      console.error("Error creating countdown:", error);
      alert("Error creating countdown. Please try again.");
    }
  };

  // Check if form is complete
  const isFormComplete =
    formData.name.trim() && formData.startDate && formData.endDate;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Step 1: Basic Details */}
      <Card>
        <CardHeader>
          <CardTitle>School Year Details</CardTitle>
          <p className="text-muted-foreground text-sm">
            Enter the basic information for your countdown
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="countdown-name">Countdown Name</Label>
            <Input
              id="countdown-name"
              placeholder="e.g., 2024-2025 School Year"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate
                      ? format(formData.startDate, "MMMM d, yyyy")
                      : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => {
                      setFormData((prev) => ({ ...prev, startDate: date }));
                      setStartDateOpen(false);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate
                      ? format(formData.endDate, "MMMM d, yyyy")
                      : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => {
                      setFormData((prev) => ({ ...prev, endDate: date }));
                      setEndDateOpen(false);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (date < today) return true;
                      if (formData.startDate) {
                        return date <= formData.startDate;
                      }
                      return false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Weekly Days Off */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Days Off</CardTitle>
          <p className="text-muted-foreground text-sm">
            Choose which days of the week are always off (e.g., weekends)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {DAYS_OF_WEEK.map((day) => (
              <Button
                key={day.value}
                variant={
                  formData.weeklyDaysOff.includes(day.value)
                    ? "default"
                    : "outline"
                }
                size="sm"
                className={cn(
                  "min-w-[60px] rounded-full px-4 py-2",
                  formData.weeklyDaysOff.includes(day.value)
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-muted",
                )}
                onClick={() => handleWeeklyDayToggle(day.value)}
              >
                {day.label.slice(0, 3)}
              </Button>
            ))}
          </div>

          {formData.weeklyDaysOff.length > 0 && (
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm font-medium">Selected weekly days off:</p>
              <p className="text-muted-foreground text-sm">
                {formData.weeklyDaysOff
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

      {/* Step 3: Additional Days Off */}
      {formData.startDate && formData.endDate && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Days Off</CardTitle>
            <p className="text-muted-foreground text-sm">
              Select specific dates that will be days off (holidays, breaks,
              etc.)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {months.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {months.map((month) => (
                  <div key={month.getTime()} className="space-y-2">
                    {/* <h3 className="text-center font-medium">
                      {format(month, "MMMM yyyy")}
                    </h3> */}
                    <div className="rounded-md border p-3">
                      <Calendar
                        mode="multiple"
                        month={month}
                        selected={formData.additionalDaysOff.filter((date) =>
                          isSameMonth(date, month),
                        )}
                        onSelect={(dates) => {
                          if (!dates) return;

                          // Remove all dates from this month and add the new selection
                          const otherMonthDates =
                            formData.additionalDaysOff.filter(
                              (date) => !isSameMonth(date, month),
                            );

                          setFormData((prev) => ({
                            ...prev,
                            additionalDaysOff: [...otherMonthDates, ...dates],
                          }));
                        }}
                        disabled={(date) =>
                          !isSameMonth(date, month) ||
                          isWeeklyDayOff(date) ||
                          (formData.startDate != null &&
                            date < formData.startDate) ||
                          (formData.endDate != null && date > formData.endDate)
                        }
                        modifiers={{
                          weeklyOff: isWeeklyDayOff,
                        }}
                        modifiersClassNames={{
                          weeklyOff:
                            "opacity-50 bg-muted text-muted-foreground",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {formData.additionalDaysOff.length > 0 && (
              <div className="bg-muted rounded-md p-4">
                <p className="mb-2 text-sm font-medium">
                  Selected additional days off (
                  {formData.additionalDaysOff.length} days):
                </p>
                <div className="text-muted-foreground max-h-32 overflow-y-auto text-sm">
                  {formData.additionalDaysOff
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((date) => format(date, "MMM d, yyyy"))
                    .join(", ")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary and Actions */}
      {isFormComplete && (
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
                <p className="text-muted-foreground text-sm">{formData.name}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">School Year Period</h3>
                <p className="text-muted-foreground text-sm">
                  {formData.startDate && formData.endDate && (
                    <>
                      {format(formData.startDate, "MMMM d, yyyy")} -{" "}
                      {format(formData.endDate, "MMMM d, yyyy")}
                    </>
                  )}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Weekly Days Off</h3>
                <p className="text-muted-foreground text-sm">
                  {formData.weeklyDaysOff.length > 0
                    ? formData.weeklyDaysOff
                        .map(
                          (dayValue) =>
                            DAYS_OF_WEEK.find((d) => d.value === dayValue)
                              ?.label,
                        )
                        .join(", ")
                    : "None selected"}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Additional Days Off</h3>
                <p className="text-muted-foreground text-sm">
                  {formData.additionalDaysOff.length} additional days selected
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleClear}>
                Clear All
              </Button>
              <Button onClick={handleCreateCountdown}>Create Countdown</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
