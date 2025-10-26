import { SignedIn, SignedOut } from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'
import { UserCircleIcon } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { useCountdownForm } from '@/modules/new-countdown/hooks/use-countdown-form'
import { AdditionalDaysOffSection } from '@/modules/new-countdown/ui/sections/additional-days-off-section'
import { FormSummarySection } from '@/modules/new-countdown/ui/sections/form-summary-section'
import { NameAndDatesSection } from '@/modules/new-countdown/ui/sections/name-and-dates-section'
import { WeeklyDaysOffSection } from '@/modules/new-countdown/ui/sections/weekly-days-off-section'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function NewCountdownForm() {
  const {
    form,
    startDate,
    endDate,
    weeklyDaysOff,
    additionalDaysOff,
    months,
    isWeeklyDayOff,
    handleWeeklyDayToggle,
    onSubmit,
    handleClear,
    isFormComplete,
    isSubmitting,
  } = useCountdownForm()

  return (
    <>
      <SignedIn>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-4xl space-y-8"
          >
            <NameAndDatesSection form={form} startDate={startDate} />

            <WeeklyDaysOffSection
              form={form}
              weeklyDaysOff={weeklyDaysOff}
              onWeeklyDayToggle={handleWeeklyDayToggle}
            />

            <AdditionalDaysOffSection
              form={form}
              startDate={startDate}
              endDate={endDate}
              additionalDaysOff={additionalDaysOff}
              months={months}
              isWeeklyDayOff={isWeeklyDayOff}
            />

            {isFormComplete && (
              <FormSummarySection
                form={form}
                startDate={startDate}
                endDate={endDate}
                weeklyDaysOff={weeklyDaysOff}
                additionalDaysOff={additionalDaysOff}
                onClear={handleClear}
                isSubmitting={isSubmitting}
              />
            )}
          </form>
        </Form>
      </SignedIn>

      <SignedOut>
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">You&apos;re not signed in.</h3>
          <p className="text-muted-foreground max-w-sm pb-4 text-sm">
            Please sign in to create a countdown.
          </p>
          <Link
            to="/sign-in/$"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'rounded-full',
            )}
          >
            <UserCircleIcon />
            Sign in
          </Link>
        </div>
      </SignedOut>
    </>
  )
}
