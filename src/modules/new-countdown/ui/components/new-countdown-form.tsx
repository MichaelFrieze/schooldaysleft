import { Form } from '@/components/ui/form'
import { useCountdownForm } from '@/modules/new-countdown/hooks/use-countdown-form'
import { AdditionalDaysOffSection } from '@/modules/new-countdown/ui/sections/additional-days-off-section'
import { FormSummarySection } from '@/modules/new-countdown/ui/sections/form-summary-section'
import { NameAndDatesSection } from '@/modules/new-countdown/ui/sections/name-and-dates-section'
import { WeeklyDaysOffSection } from '@/modules/new-countdown/ui/sections/weekly-days-off-section'

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
  )
}
