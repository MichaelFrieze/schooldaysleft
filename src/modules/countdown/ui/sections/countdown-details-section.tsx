"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, CalendarIcon, Sun } from "lucide-react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CountdownDetailsSectionProps {
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

export const CountdownDetailsSection = ({
  countdownId,
}: CountdownDetailsSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<CountdownDetailsSectionSkeleton />}>
        <CountdownDetailsSectionSuspense countdownId={countdownId} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CountdownDetailsSectionSkeleton = () => {
  return <div className="pb-8 md:pb-12">loading...</div>;
};

const CountdownDetailsSectionSuspense = ({
  countdownId,
}: CountdownDetailsSectionProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
  });

  // Convert additional days off to Date objects for calendar
  const additionalDaysOffDates = useMemo(
    () => countdown.additionalDaysOff.map((date) => new Date(date)),
    [countdown.additionalDaysOff],
  );

  // Calculate remaining additional days off (future dates only)
  const remainingAdditionalDaysOff = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return additionalDaysOffDates.filter((date) => date >= today).length;
  }, [additionalDaysOffDates]);

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

  return (
    <section className="pb-8 md:pb-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                    // className={`rounded-full px-2 py-1 text-xs ${
                    //   countdown.weeklyDaysOff.includes(day.value)
                    //     ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    //     : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    // }`}
                    className={`rounded-full px-2 py-1 text-xs ${
                      countdown.weeklyDaysOff.includes(day.value)
                        ? "bg-accent/70 text-accent-foreground"
                        : "bg-primary/70 text-primary-foreground"
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
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Holidays & Breaks ({remainingAdditionalDaysOff})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextDayOff && (
                <div className="text-primary text-center text-xs font-medium">
                  Upcoming: {format(nextDayOff, "EEEE, MMM d, yyyy")}
                </div>
              )}

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
                      day_selected: "bg-primary text-primary-foreground",
                      day_disabled: "text-muted-foreground opacity-30",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Holidays & Breaks ({remainingAdditionalDaysOff})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                No additional days off configured for this countdown.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
