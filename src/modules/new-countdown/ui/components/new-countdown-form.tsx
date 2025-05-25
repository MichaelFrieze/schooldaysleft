"use client";

import { Form } from "@/components/ui/form";
import { AdditionalDaysOffSection } from "@/modules/new-countdown/ui/sections/additional-days-off-section";
import { BasicDetailsSection } from "@/modules/new-countdown/ui/sections/basic-details-section";
import { FormSummarySection } from "@/modules/new-countdown/ui/sections/form-summary-section";
import { WeeklyDaysOffSection } from "@/modules/new-countdown/ui/sections/weekly-days-off-section";
import { useCountdownForm } from "@/modules/new-countdown/hooks/use-countdown-form";

export const NewCountdownForm = () => {
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
  } = useCountdownForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-8"
      >
        <BasicDetailsSection form={form} startDate={startDate} />

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
            onClear={handleClear}
          />
        )}
      </form>
    </Form>
  );
};
