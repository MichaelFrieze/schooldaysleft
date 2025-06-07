import { useTRPC } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMonths,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createCountdownMutation = useMutation(
    trpc.countdown.create.mutationOptions(),
  );
  const invalidateGetAllCountdowns = () => {
    void queryClient.invalidateQueries({
      queryKey: trpc.countdown.getAll.queryKey(),
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      weeklyDaysOff: [0, 6], // Default to Sunday and Saturday
      additionalDaysOff: [],
    },
  });

  const watchedValues = form.watch();
  const { startDate, endDate, weeklyDaysOff, additionalDaysOff } =
    watchedValues;

  useEffect(() => {
    const currentAdditionalDays = form.getValues("additionalDaysOff");
    const filteredDays = currentAdditionalDays.filter(
      (date) =>
        (isSameDay(date, startDate) || isAfter(date, startDate)) &&
        (isSameDay(date, endDate) || isBefore(date, endDate)),
    );

    // Only update if there's a difference to avoid infinite loops
    if (filteredDays.length !== currentAdditionalDays.length) {
      form.setValue("additionalDaysOff", filteredDays);
    }
  }, [startDate, endDate, form]);

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

  const isWeeklyDayOff = (date: Date): boolean => {
    return weeklyDaysOff.includes(getDay(date));
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
        (date) => getDay(date) !== dayValue,
      );

      if (updatedAdditionalDaysOff.length !== currentAdditionalDaysOff.length) {
        form.setValue("additionalDaysOff", updatedAdditionalDaysOff);
      }
    }
  };

  const onSubmit = (data: FormData) => {
    createCountdownMutation.mutate(data, {
      onSuccess: (createdCountdown) => {
        invalidateGetAllCountdowns();

        console.log("Countdown created successfully", {
          data: createdCountdown,
        });

        if (createdCountdown?.id) {
          void router.push(`/countdown/${createdCountdown.id}`);
        } else {
          console.error("Countdown created but no id found");
        }
      },
      onError: (error) => {
        toast.error("Failed to create countdown", {
          description: error.message,
          descriptionClassName: "!text-destructive",
        });
        console.error("Failed to create countdown:", error);
      },
    });
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
