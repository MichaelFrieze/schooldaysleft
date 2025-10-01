"use client";

import { Form } from "@/components/ui/form";
import { useCountdownForm } from "@/modules/edit-countdown/hooks/use-countdown-form";
import { AdditionalDaysOffSection } from "@/modules/edit-countdown/ui/sections/additional-days-off-section";
import { FormSummarySection } from "@/modules/edit-countdown/ui/sections/form-summary-section";
import { NameAndDatesSection } from "@/modules/edit-countdown/ui/sections/name-and-dates-section";
import { WeeklyDaysOffSection } from "@/modules/edit-countdown/ui/sections/weekly-days-off-section";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditCountdownFormError } from "./edit-countdown-form-error";

export const EditCountdownForm = () => {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary FallbackComponent={EditCountdownFormError} onReset={reset}>
			<Suspense>
				<EditCountdownFormSuspense />
			</Suspense>
		</ErrorBoundary>
	);
};

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
	} = useCountdownForm();

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
	);
};
