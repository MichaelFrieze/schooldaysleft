import { countdownsQueryOptions } from "@/modules/countdown/lib/countdowns-query-options";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import {
	addMonths,
	getDay,
	isAfter,
	isBefore,
	isSameDay,
	startOfMonth,
} from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
	.object({
		name: z
			.string()
			.min(1, "Countdown name is required")
			.max(60, "Countdown name must be less than 60 characters")
			.trim(),
		startDate: z.number({
			required_error: "Start date is required",
		}),
		endDate: z.number({
			required_error: "End date is required",
		}),
		weeklyDaysOff: z.array(z.number()),
		additionalDaysOff: z.array(z.number()),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: "End date must be after start date",
		path: ["endDate"],
	});

export type FormData = z.infer<typeof formSchema>;

export const useCountdownForm = () => {
	const navigate = useNavigate({ from: "/countdown/new" });
	const queryClient = useQueryClient();
	const createCountdownMutation = useMutation({
		mutationFn: useConvexMutation(api.countdowns.create),
	});
	const invalidateGetAllCountdowns = () => {
		void queryClient.invalidateQueries({
			queryKey: countdownsQueryOptions().queryKey,
		});
	};

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			weeklyDaysOff: [0, 6],
			additionalDaysOff: [],
		},
	});

	const watchedValues = form.watch();
	const { startDate, endDate, weeklyDaysOff, additionalDaysOff } =
		watchedValues;

	useEffect(() => {
		const currentAdditionalDays = form.getValues("additionalDaysOff");
		const filteredDays = currentAdditionalDays.filter(
			(timestamp) =>
				(isSameDay(timestamp, startDate) || isAfter(timestamp, startDate)) &&
				(isSameDay(timestamp, endDate) || isBefore(timestamp, endDate)),
		);

		if (filteredDays.length !== currentAdditionalDays.length) {
			form.setValue("additionalDaysOff", filteredDays);
		}
	}, [startDate, endDate, form]);

	const getMonthsBetweenDates = (start: number, end: number): number[] => {
		const months: number[] = [];
		let current = startOfMonth(start);
		const endMonth = startOfMonth(end);

		while (current <= endMonth) {
			months.push(current.getTime());
			current = addMonths(current, 1);
		}

		return months;
	};

	const isWeeklyDayOff = (timestamp: number): boolean => {
		return weeklyDaysOff.includes(getDay(timestamp));
	};

	const handleWeeklyDayToggle = (dayValue: number) => {
		const currentWeeklyDaysOff = form.getValues("weeklyDaysOff");
		const isAddingDay = !currentWeeklyDaysOff.includes(dayValue);

		const newWeeklyDaysOff = isAddingDay
			? [...currentWeeklyDaysOff, dayValue]
			: currentWeeklyDaysOff.filter((d) => d !== dayValue);

		newWeeklyDaysOff.sort((a, b) => a - b);
		form.setValue("weeklyDaysOff", newWeeklyDaysOff);

		if (isAddingDay) {
			const currentAdditionalDaysOff = form.getValues("additionalDaysOff");
			const updatedAdditionalDaysOff = currentAdditionalDaysOff.filter(
				(timestamp) => getDay(timestamp) !== dayValue,
			);

			if (updatedAdditionalDaysOff.length !== currentAdditionalDaysOff.length) {
				form.setValue("additionalDaysOff", updatedAdditionalDaysOff);
			}
		}
	};

	const onSubmit = (data: FormData) => {
		createCountdownMutation.mutate(
			{
				name: data.name,
				startDate: data.startDate,
				endDate: data.endDate,
				weeklyDaysOff: data.weeklyDaysOff,
				additionalDaysOff: data.additionalDaysOff,
			},
			{
				onSuccess: (countdownId) => {
					invalidateGetAllCountdowns();

					void navigate({
						to: "/countdown/$countdownId",
						params: { countdownId },
					});
				},
				onError: (error) => {
					if (error.message.includes("Countdown name already exists")) {
						form.setError("name", {
							type: "manual",
							message: "Countdown name already exists.",
						});
					}

					toast.error("Failed to create countdown", {
						description: error.message,
						descriptionClassName: "!text-destructive",
					});
					console.error("Failed to create countdown:", error);
				},
			},
		);
	};

	const handleClear = () => {
		form.reset();
	};

	const isFormComplete =
		form.formState.isValid &&
		startDate &&
		endDate &&
		form.getValues("name").trim();

	const months =
		startDate && endDate ? getMonthsBetweenDates(startDate, endDate) : [];

	return {
		form,
		watchedValues,
		startDate,
		endDate,
		weeklyDaysOff,
		additionalDaysOff,
		months,
		getMonthsBetweenDates,
		isWeeklyDayOff,
		handleWeeklyDayToggle,
		onSubmit,
		handleClear,
		isFormComplete,
		isSubmitting: createCountdownMutation.isPending,
	};
};
