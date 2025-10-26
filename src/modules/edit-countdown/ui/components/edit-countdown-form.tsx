import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Authenticated, Unauthenticated } from 'convex/react'
import { Link } from '@tanstack/react-router'
import { UserCircleIcon } from 'lucide-react'
import { EditCountdownFormError } from './edit-countdown-form-error'
import { Form } from '@/components/ui/form'
import { useCountdownForm } from '@/modules/edit-countdown/hooks/use-countdown-form'
import { AdditionalDaysOffSection } from '@/modules/edit-countdown/ui/sections/additional-days-off-section'
import { FormSummarySection } from '@/modules/edit-countdown/ui/sections/form-summary-section'
import { NameAndDatesSection } from '@/modules/edit-countdown/ui/sections/name-and-dates-section'
import { WeeklyDaysOffSection } from '@/modules/edit-countdown/ui/sections/weekly-days-off-section'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const EditCountdownForm = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <>
      <Authenticated>
        <ErrorBoundary
          FallbackComponent={EditCountdownFormError}
          onReset={reset}
        >
          <Suspense>
            <EditCountdownFormSuspense />
          </Suspense>
        </ErrorBoundary>
      </Authenticated>

      <Unauthenticated>
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">You&apos;re not signed in.</h3>
          <p className="text-muted-foreground max-w-sm pb-4 text-sm">
            Please sign in to edit your countdown.
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
      </Unauthenticated>
    </>
  )
}

export const EditCountdownFormSuspense = () => {
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
    isFormComplete,
    defaultCountdown,
    handleReset,
    handleDelete,
    isDeleting,
    isSubmitting,
  } = useCountdownForm()

  return (
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

        {startDate && endDate && (
          <AdditionalDaysOffSection
            form={form}
            startDate={startDate}
            endDate={endDate}
            additionalDaysOff={additionalDaysOff}
            months={months}
            isWeeklyDayOff={isWeeklyDayOff}
          />
        )}

        {isFormComplete && (
          <FormSummarySection
            form={form}
            startDate={startDate}
            endDate={endDate}
            weeklyDaysOff={weeklyDaysOff}
            additionalDaysOff={additionalDaysOff}
            defaultCountdown={defaultCountdown}
            handleReset={handleReset}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </Form>
  )
}
