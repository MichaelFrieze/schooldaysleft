import { format, isSameDay } from 'date-fns'
import { Loader2, Trash2 } from 'lucide-react'
import type { FormData } from '@/modules/edit-countdown/hooks/use-countdown-form'
import type { Doc } from 'convex/_generated/dataModel'
import type { UseFormReturn } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DAYS_OF_WEEK } from '@/lib/constants'

interface FormSummarySectionProps {
  form: UseFormReturn<FormData>
  startDate: number
  endDate: number
  weeklyDaysOff: Array<number>
  additionalDaysOff: Array<number>
  defaultCountdown: Doc<'countdowns'>
  handleReset: () => void
  handleDelete: () => void
  isDeleting?: boolean
  isSubmitting?: boolean
}

const ValueComparison = ({
  title,
  oldValue,
  newValue,
  hasChanged,
}: {
  title: string
  oldValue: string
  newValue: string
  hasChanged: boolean
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
)

export const FormSummarySection = ({
  form,
  startDate,
  endDate,
  weeklyDaysOff,
  additionalDaysOff,
  defaultCountdown,
  handleReset,
  handleDelete,
  isDeleting = false,
  isSubmitting = false,
}: FormSummarySectionProps) => {
  const formatWeeklyDaysOff = (days: Array<number>) => {
    return days.length > 0
      ? days
          .map(
            (dayValue) => DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label,
          )
          .join(', ')
      : 'None selected'
  }

  const nameChanged = form.getValues('name') !== defaultCountdown.name
  const startDateChanged = !isSameDay(startDate, defaultCountdown.startDate)
  const endDateChanged = !isSameDay(endDate, defaultCountdown.endDate)

  const sortedNewWeeklyDays = [...weeklyDaysOff].sort((a, b) => a - b)
  const sortedOldWeeklyDays = [...defaultCountdown.weeklyDaysOff].sort(
    (a, b) => a - b,
  )
  const weeklyDaysOffChanged =
    sortedNewWeeklyDays.length !== sortedOldWeeklyDays.length ||
    sortedNewWeeklyDays.some((day, index) => day !== sortedOldWeeklyDays[index])

  const newDayTimestamps = [...additionalDaysOff].sort((a, b) => a - b)
  const oldDayTimestamps = [...defaultCountdown.additionalDaysOff].sort(
    (a, b) => a - b,
  )
  const additionalDaysOffChanged =
    newDayTimestamps.length !== oldDayTimestamps.length ||
    newDayTimestamps.some(
      (timestamp, index) => timestamp !== oldDayTimestamps[index],
    )

  const hasChanges =
    nameChanged ||
    startDateChanged ||
    endDateChanged ||
    weeklyDaysOffChanged ||
    additionalDaysOffChanged

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
            newValue={form.getValues('name')}
            hasChanged={nameChanged}
          />

          <Separator />

          <ValueComparison
            title="School Year Period"
            oldValue={`${format(defaultCountdown.startDate, 'MMMM d, yyyy')} - ${format(defaultCountdown.endDate, 'MMMM d, yyyy')}`}
            newValue={`${format(startDate, 'MMMM d, yyyy')} - ${format(endDate, 'MMMM d, yyyy')}`}
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

        <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
          <div className="flex flex-row justify-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!hasChanges}
                  className="flex-1"
                >
                  Reset Changes
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[calc(100vw-4rem)] max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently discard all the changes you have made
                    to the form.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className={buttonVariants({ variant: 'destructive' })}
                  >
                    Discard Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  className="flex-1"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[calc(100vw-4rem)] max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this countdown?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this countdown and all of its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className={buttonVariants({ variant: 'destructive' })}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Button
            type="submit"
            disabled={!hasChanges || isSubmitting}
            className="sm:w-32"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </div>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
