import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths, getDay, startOfMonth } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  calculateSchoolDaysRemaining,
  createCountdown,
} from "@/modules/new-countdown/server/mock-data";

// Form schema
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "Countdown name is required")
      .max(100, "Name must be less than 100 characters"),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
    weeklyDaysOff: z.array(z.number()),
    additionalDaysOff: z.array(z.date()),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type FormData = z.infer<typeof formSchema>;

export const useCountdownForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      weeklyDaysOff: [0, 6], // Default to Sunday and Saturday
      additionalDaysOff: [],
    },
  });

  const watchedValues = form.watch();
  const { startDate, endDate, weeklyDaysOff, additionalDaysOff } =
    watchedValues;

  // Generate months between start and end date
  const getMonthsBetweenDates = (start: Date, end: Date): Date[] => {
    const months: Date[] = [];
    let current = startOfMonth(start);
    const endMonth = startOfMonth(end);

    while (current <= endMonth) {
      months.push(current);
      current = addMonths(current, 1);
    }

    return months;
  };

  // Check if a date should be disabled (is a weekly day off)
  const isWeeklyDayOff = (date: Date): boolean => {
    return weeklyDaysOff.includes(getDay(date));
  };

  // Handle weekly days off selection
  const handleWeeklyDayToggle = (dayValue: number) => {
    const currentDays = form.getValues("weeklyDaysOff");
    const newDays = currentDays.includes(dayValue)
      ? currentDays.filter((d) => d !== dayValue)
      : [...currentDays, dayValue];

    form.setValue("weeklyDaysOff", newDays);
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    try {
      const countdown = createCountdown({
        name: data.name.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
        weeklyDaysOff: data.weeklyDaysOff,
        additionalDaysOff: data.additionalDaysOff,
      });

      const daysRemaining = calculateSchoolDaysRemaining(countdown);

      alert(
        `Countdown "${countdown.name}" created successfully! ${daysRemaining} school days remaining.`,
      );

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error creating countdown:", error);
      alert("Error creating countdown. Please try again.");
    }
  };

  // Clear all form data
  const handleClear = () => {
    form.reset();
  };

  // Check if form is complete
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
  };
};
