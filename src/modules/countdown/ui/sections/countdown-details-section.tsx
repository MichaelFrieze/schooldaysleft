import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
} from 'date-fns'
import {
  CalendarDays,
  CalendarIcon,
  Eye,
  EyeOff,
  Info,
  Sun,
} from 'lucide-react'
import { Suspense, useMemo, useState } from 'react'
import { calculateCountdownProgress } from '../../lib/calculate-countdown-progress'
import { calculateDaysLeft } from '../../lib/calculate-days-left'
import { calculateTotalDays } from '../../lib/calculate-total-days'
import { calculateWeeksRemaining } from '../../lib/calculate-weeks-remaining'
import type { Id } from 'convex/_generated/dataModel'
import { formatDate } from '@/lib/utils'
import { DAYS_OF_WEEK } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

interface CountdownDetailsSectionProps {
  countdownId: string
}

export const CountdownDetailsSection = ({
  countdownId,
}: CountdownDetailsSectionProps) => {
  return (
    <Suspense fallback={<CountdownDetailsSectionLoading />}>
      <CountdownDetailsSectionSuspense countdownId={countdownId} />
    </Suspense>
  )
}

const CountdownDetailsSectionSuspense = ({
  countdownId,
}: CountdownDetailsSectionProps) => {
  const [showPastMonths, setShowPastMonths] = useState(false)

  const { data: countdown } = useSuspenseQuery(
    convexQuery(api.countdowns.getById, {
      id: countdownId as Id<'countdowns'>,
    }),
  )

  if (!countdown) {
    throw new Error('Countdown not found')
  }

  const allAdditionalDaysOffDates = useMemo(
    () => countdown.additionalDaysOff.map((date) => new Date(date)),
    [countdown.additionalDaysOff],
  )

  const today = (() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  })()

  const daysLeft = calculateDaysLeft(countdown)
  const totalDays = calculateTotalDays(countdown)
  const daysCompleted = totalDays - daysLeft
  const progressPercentage = calculateCountdownProgress(countdown)
  const weeksRemaining = calculateWeeksRemaining(countdown)

  const totalCalendarDays = (() => {
    const startDate = new Date(countdown.startDate)
    const endDate = new Date(countdown.endDate)
    return (
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1
    )
  })()

  const startDate = new Date(countdown.startDate)
  const endDate = new Date(countdown.endDate)

  const upcomingAdditionalDaysOffDates = allAdditionalDaysOffDates
    .filter((date) => isSameDay(date, today) || isAfter(date, today))
    .sort((a, b) => a.getTime() - b.getTime())

  const numberOfRemainingAdditionalDaysOff =
    upcomingAdditionalDaysOffDates.length

  const nextAdditionalDayOff =
    upcomingAdditionalDaysOffDates.length > 0
      ? upcomingAdditionalDaysOffDates[0]
      : null

  const allMonths = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  })

  const months = showPastMonths
    ? allMonths
    : allMonths.filter((month) => !isBefore(endOfMonth(month), today))

  const hasPastMonths = allMonths.some((month) =>
    isBefore(endOfMonth(month), today),
  )

  const isDateDisabled = (date: Date) => {
    if (showPastMonths) {
      if (isBefore(date, startDate) || isAfter(date, endDate)) {
        return true
      }
    } else {
      if (isBefore(date, today) || isAfter(date, endDate)) {
        return true
      }
    }

    const dayOfWeek = date.getDay()
    if (countdown.weeklyDaysOff.includes(dayOfWeek)) {
      return true
    }

    return false
  }

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
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Start Date</h4>
                <p className="text-muted-foreground text-sm">
                  {formatDate(countdown.startDate)}
                </p>
              </div>
              <div>
                <h4 className="font-medium">End Date</h4>
                <p className="text-muted-foreground text-sm">
                  {formatDate(countdown.endDate)}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Total School Days</h4>
                <p className="text-muted-foreground text-sm">
                  {totalDays} days
                </p>
              </div>
              <div>
                <h4 className="font-medium">Days Completed</h4>
                <p className="text-muted-foreground text-sm">
                  {daysCompleted} ({Math.round(progressPercentage)}%)
                </p>
              </div>
              <div>
                <h4 className="font-medium">Days Remaining</h4>
                <p className="text-muted-foreground text-sm">{daysLeft} days</p>
              </div>
              <div>
                <h4 className="font-medium">Weeks Remaining</h4>
                <p className="text-muted-foreground text-sm">
                  {weeksRemaining} {weeksRemaining === 1 ? 'week' : 'weeks'}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Calendar Duration</h4>
                <p className="text-muted-foreground text-sm">
                  {totalCalendarDays} days
                </p>
              </div>
              <div>
                <h4 className="font-medium">Created</h4>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(countdown.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
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
                        ? 'bg-accent/70 text-accent-foreground'
                        : 'bg-primary/70 text-primary-foreground'
                    }`}
                  >
                    {countdown.weeklyDaysOff.includes(day.value)
                      ? 'Off'
                      : 'School'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Holidays & Breaks ({numberOfRemainingAdditionalDaysOff})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPastMonths(!showPastMonths)}
                className="flex items-center gap-2"
                disabled={!hasPastMonths}
              >
                {showPastMonths ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span className="hidden sm:block">Hide Past</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:block">Show All</span>
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextAdditionalDayOff ? (
              <div className="bg-accent text-accent-foreground flex items-center gap-3 rounded-lg border p-3 text-sm">
                <Info className="h-5 w-5 shrink-0" />
                <div className="font-medium">
                  {isSameDay(nextAdditionalDayOff, today)
                    ? 'Today is a holiday or break!'
                    : `Next up: ${format(
                        nextAdditionalDayOff,
                        'EEEE, MMM d, yyyy',
                      )}`}
                </div>
              </div>
            ) : (
              <div className="bg-accent text-accent-foreground flex items-center gap-3 rounded-lg border p-3 text-sm">
                <Info className="h-5 w-5 shrink-0" />
                <div className="font-medium">
                  No more holidays or breaks scheduled.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {months.map((month) => (
                <div key={month.getTime()} className="space-y-2">
                  <div className="flex justify-center rounded-md border p-3">
                    <Calendar
                      mode="multiple"
                      month={month}
                      selected={(showPastMonths
                        ? allAdditionalDaysOffDates
                        : upcomingAdditionalDaysOffDates
                      ).filter((date) => isSameMonth(date, month))}
                      disabled={(date) =>
                        !isSameMonth(date, month) || isDateDisabled(date)
                      }
                      disableNavigation={true}
                      fixedWeeks={true}
                      classNames={{
                        day_selected: 'bg-primary text-primary-foreground',
                        day: 'pointer-events-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 size-8 p-0 font-normal aria-selected:opacity-100',
                        day_outside:
                          'text-muted-foreground aria-selected:text-primary-foreground',
                        button_next: 'hidden pointer-events-none',
                        button_previous: 'hidden pointer-events-none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export const CountdownDetailsSectionLoading = () => {
  const WEEK_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const MONTH_SKELETON_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8']
  const DAY_CELL_KEYS = Array.from({ length: 42 }, (_, n) => `day-${n}`)

  return (
    <section className="animate-[delayed-fade-in_.5s_ease-out] pb-8 md:pb-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Countdown Details Skeleton */}
        <Card className="pb-7">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-28" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule Skeleton */}
        <Card className="pb-7">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-56" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day.value}
                  className="flex items-center justify-between"
                >
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holidays & Breaks Skeleton */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-44" />
              </CardTitle>
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-[280px] md:w-[360px]" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {MONTH_SKELETON_KEYS.map((key) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-center rounded-md border p-3">
                    <div className="w-full space-y-3">
                      <div className="flex justify-center">
                        <Skeleton className="h-6 w-28" />
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {WEEK_KEYS.map((wk) => (
                          <Skeleton key={wk} className="h-3 w-5" />
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {DAY_CELL_KEYS.map((dayCellKey) => (
                          <Skeleton
                            key={dayCellKey}
                            className="h-8 w-8 rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
