import { useTRPC } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  addMonths,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { useParams, useRouter } from "next/navigation";
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
  const { countdownId } = useParams<{ countdownId: string }>();

  const { data: defaultCountdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: countdownId,
    }),
    retry: false,
  });

  const updateCountdownMutation = useMutation(
    trpc.countdown.update.mutationOptions(),
  );

  const deleteCountdownMutation = useMutation({
    ...trpc.countdown.delete.mutationOptions(),
  });

  const invalidateCountdownQueries = () => {
    void queryClient.invalidateQueries({
      queryKey: trpc.countdown.getAll.queryKey(),
    });
    void queryClient.invalidateQueries({
      queryKey: trpc.countdown.getById.queryKey({ id: countdownId }),
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultCountdown.name,
      startDate: defaultCountdown.startDate,
      endDate: defaultCountdown.endDate,
      weeklyDaysOff: defaultCountdown.weeklyDaysOff,
      additionalDaysOff: defaultCountdown.additionalDaysOff,
    },
  });

  const watchedValues = form.watch();
  const { startDate, endDate, weeklyDaysOff, additionalDaysOff } =
    watchedValues;

  // Filter out additional days off that are outside the date range
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

    // If a weekly day off was added, remove any additional days off that fall on that day
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
    updateCountdownMutation.mutate(
      {
        id: countdownId,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        weeklyDaysOff: data.weeklyDaysOff,
        additionalDaysOff: data.additionalDaysOff,
      },
      {
        onSuccess: (updatedCountdown) => {
          invalidateCountdownQueries();

          void router.push(`/countdown/${countdownId}`);
        },
        onError: (error) => {
          if (error.message.includes("Countdown name already exists")) {
            form.setError("name", {
              type: "manual",
              message: "Countdown name already exists.",
            });
          }

          toast.error("Failed to edit countdown", {
            description: error.message,
            descriptionClassName: "!text-destructive",
          });
          console.error("Failed to edit countdown:", error);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteCountdownMutation.mutate(
      {
        id: countdownId,
      },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: trpc.countdown.getAll.queryKey(),
          });

          void router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Failed to delete countdown", {
            description: error.message,
            descriptionClassName: "!text-destructive",
          });
          console.error("Failed to delete countdown:", error);
        },
      },
    );
  };

  const handleReset = () => {
    form.reset({
      name: defaultCountdown.name,
      startDate: defaultCountdown.startDate,
      endDate: defaultCountdown.endDate,
      weeklyDaysOff: defaultCountdown.weeklyDaysOff,
      additionalDaysOff: defaultCountdown.additionalDaysOff,
    });
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
    isFormComplete,
    defaultCountdown,
    handleReset,
    handleDelete,
    isDeleting: deleteCountdownMutation.isPending,
    isSubmitting: updateCountdownMutation.isPending,
  };
};
