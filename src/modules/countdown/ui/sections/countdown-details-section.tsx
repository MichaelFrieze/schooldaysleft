"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
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
      <Suspense>
        <CountdownDetailsSectionSuspense countdownId={countdownId} />
      </Suspense>
    </ErrorBoundary>
  );
};

// const CountdownDetailsSectionSkeleton = () => {
//   return <div className="pb-8 md:pb-12">loading...</div>;
// };

const CountdownDetailsSectionSuspense = ({
  countdownId,
}: CountdownDetailsSectionProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
  });

  const allAdditionalDaysOffDates = useMemo(
    () => countdown.additionalDaysOff.map((date) => new Date(date)),
    [countdown.additionalDaysOff],
  );

  const today = (() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  })();

  const upcomingAdditionalDaysOffDates = allAdditionalDaysOffDates
    .filter((date) => isSameDay(date, today) || isAfter(date, today))
    .sort((a, b) => a.getTime() - b.getTime());

  const numberOfRemainingAdditionalDaysOff =
    upcomingAdditionalDaysOffDates.length;

  const nextAdditionalDayOff =
    upcomingAdditionalDaysOffDates.length > 0
      ? upcomingAdditionalDaysOffDates[0]
      : null;

  const startDate = new Date(countdown.startDate);
  const endDate = new Date(countdown.endDate);

  const isDateDisabled = (date: Date) => {
    if (
      isBefore(date, startDate) ||
      isAfter(date, endDate) ||
      isBefore(date, today)
    ) {
      return true;
    }

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
                Holidays & Breaks ({numberOfRemainingAdditionalDaysOff})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextAdditionalDayOff && isAfter(nextAdditionalDayOff, today) ? (
                <div className="text-primary text-center text-xs font-medium">
                  Upcoming: {format(nextAdditionalDayOff, "EEEE, MMM d, yyyy")}
                </div>
              ) : nextAdditionalDayOff &&
                isSameDay(nextAdditionalDayOff, today) ? (
                <div className="text-primary text-center text-xs font-medium">
                  Today is a holiday or break!
                </div>
              ) : null}

              <div className="flex justify-center">
                <div className="max-h-90 w-fit overflow-y-auto rounded-lg border">
                  <Calendar
                    mode="multiple"
                    selected={upcomingAdditionalDaysOffDates}
                    disabled={isDateDisabled}
                    defaultMonth={today}
                    fromDate={startDate}
                    toDate={endDate}
                    className="w-full"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground",
                      day_disabled: "text-muted-foreground opacity-30",
                      day: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 size-8 p-0 font-normal aria-selected:opacity-100",
                      day_outside:
                        "day-outside text-muted-foreground aria-selected:text-primary-foreground",
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
                Holidays & Breaks ({numberOfRemainingAdditionalDaysOff})
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
