"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { calculateCountdownProgress } from "@/modules/countdown/lib/calculate-countdown-progress";
import { calculateDaysLeft } from "@/modules/countdown/lib/calculate-days-left";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CalendarDays,
  Edit,
  School,
  Settings,
  Sun,
  Trash2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface CountdownViewProps {
  countdownId: string;
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

export const CountdownView = ({ countdownId }: CountdownViewProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
  });

  const daysLeft = useMemo(() => calculateDaysLeft(countdown), [countdown]);
  const progressValue = useMemo(
    () => calculateCountdownProgress(countdown),
    [countdown],
  );

  const weeklyDaysOffLabels = countdown.weeklyDaysOff
    .map((dayValue) => DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label)
    .filter(Boolean);

  const isCountdownComplete = daysLeft === 0;
  const hasStarted = new Date() >= new Date(countdown.startDate);

  // Convert additional days off to Date objects for calendar
  const additionalDaysOffDates = useMemo(
    () => countdown.additionalDaysOff.map((date) => new Date(date)),
    [countdown.additionalDaysOff],
  );

  // Find next upcoming day off from additionalDaysOff only
  const nextDayOff = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only look at additionalDaysOff, not start/end dates or weekly days off
    const upcomingAdditionalDays = additionalDaysOffDates
      .filter((date) => date >= today)
      .sort((a, b) => a.getTime() - b.getTime());

    return upcomingAdditionalDays.length > 0 ? upcomingAdditionalDays[0] : null;
  }, [additionalDaysOffDates]);

  // Calendar configuration
  const startDate = new Date(countdown.startDate);
  const endDate = new Date(countdown.endDate);

  const isDateDisabled = (date: Date) => {
    // Disable dates outside the countdown period
    if (date < startDate || date > endDate) {
      return true;
    }

    // Disable weekly days off
    const dayOfWeek = date.getDay();
    if (countdown.weeklyDaysOff.includes(dayOfWeek)) {
      return true;
    }

    return false;
  };

  const isDateSelected = (date: Date) => {
    return additionalDaysOffDates.some(
      (selectedDate) =>
        selectedDate.getFullYear() === date.getFullYear() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getDate() === date.getDate(),
    );
  };

  return (
    <section className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {countdown.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isCountdownComplete
              ? "🎉 Countdown Complete!"
              : !hasStarted
                ? "Countdown hasn't started yet"
                : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} to go!`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/countdown/${countdown.id}/edit`}>
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Countdown Display */}
        <div className="lg:col-span-2">
          <Card className="border-border/40 bg-background overflow-hidden rounded-xl border shadow-lg">
            <CardContent className="p-8">
              <div className="mb-8 flex items-start justify-between">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <School className="text-primary h-8 w-8" />
                </div>
                <div className="text-muted-foreground hover:text-foreground h-8 w-8">
                  <Settings className="h-5 w-5" />
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums md:text-9xl ${
                    isCountdownComplete ? "from-green-500 to-green-600" : ""
                  }`}
                >
                  {daysLeft}
                </div>
                <p className="text-muted-foreground mt-2 text-xl font-medium">
                  {isCountdownComplete
                    ? "All done! 🎉"
                    : !hasStarted
                      ? "days until start"
                      : daysLeft === 1
                        ? "day to go!"
                        : "days to go!"}
                </p>
              </div>

              <div className="mt-8 flex justify-center space-x-8">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground text-sm font-medium">
                    {weeklyDaysOffLabels.length > 0
                      ? `${weeklyDaysOffLabels.join(", ")} Off`
                      : "No weekly days off"}
                  </span>
                </div>
                {countdown.additionalDaysOff.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-amber-500" />
                    <span className="text-muted-foreground text-sm font-medium">
                      {countdown.additionalDaysOff.length} Holiday
                      {countdown.additionalDaysOff.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-medium">
                    Progress
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    {Math.round(progressValue)}%
                  </span>
                </div>
                <Progress value={progressValue} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Countdown Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Countdown Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Start Date</h4>
                <p className="text-muted-foreground text-sm">
                  {formatDate(countdown.startDate)}
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium">End Date</h4>
                <p className="text-muted-foreground text-sm">
                  {formatDate(countdown.endDate)}
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium">Created</h4>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(countdown.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day.value}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{day.label}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        countdown.weeklyDaysOff.includes(day.value)
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      }`}
                    >
                      {countdown.weeklyDaysOff.includes(day.value)
                        ? "Off"
                        : "School"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Days Off Calendar */}
          {countdown.additionalDaysOff.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Holidays & Breaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="mb-2 text-sm font-medium">
                      Total: {countdown.additionalDaysOff.length} day
                      {countdown.additionalDaysOff.length !== 1 ? "s" : ""}{" "}
                    </div>
                    {/* {countdown.additionalDaysOff.length > 0 && (
                      <div className="text-muted-foreground mb-2 text-xs">
                        From{" "}
                        {format(
                          new Date(
                            Math.min(
                              ...countdown.additionalDaysOff.map((d) =>
                                new Date(d).getTime(),
                              ),
                            ),
                          ),
                          "MMM d, yyyy",
                        )}{" "}
                        to{" "}
                        {format(
                          new Date(
                            Math.max(
                              ...countdown.additionalDaysOff.map((d) =>
                                new Date(d).getTime(),
                              ),
                            ),
                          ),
                          "MMM d, yyyy",
                        )}
                      </div>
                    )} */}
                    {nextDayOff && (
                      <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        Next holiday: {format(nextDayOff, "EEEE, MMM d, yyyy")}
                      </div>
                    )}
                  </div>

                  {/* Calendar View */}
                  <div className="flex justify-center">
                    <div className="max-h-80 w-fit overflow-y-auto rounded-lg border">
                      <Calendar
                        mode="multiple"
                        selected={additionalDaysOffDates}
                        disabled={isDateDisabled}
                        defaultMonth={startDate}
                        fromDate={startDate}
                        toDate={endDate}
                        className="w-full"
                        classNames={{
                          day_selected:
                            "bg-amber-500 text-amber-50 hover:bg-amber-600 focus:bg-amber-600",
                          day_disabled: "text-muted-foreground opacity-30",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Holidays & Breaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  No additional days off configured for this countdown.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View All Countdowns
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/countdown/new">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Create New Countdown
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
