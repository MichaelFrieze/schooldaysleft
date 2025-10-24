import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import {
  addMonths,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import type { Id } from 'convex/_generated/dataModel'
import { countdownsQueryOptions } from '@/modules/countdown/lib/countdowns-query-options'

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Countdown name is required')
      .max(60, 'Countdown name must be less than 60 characters')
      .trim(),
    startDate: z.number({
      error: 'Start date is required',
    }),
    endDate: z.number({
      error: 'End date is required',
    }),
    weeklyDaysOff: z.array(z.number()),
    additionalDaysOff: z.array(z.number()),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })

export type FormData = z.infer<typeof formSchema>

export const useCountdownForm = () => {
  const navigate = useNavigate({ from: '/countdown/$countdownId/edit' })
  const queryClient = useQueryClient()

  const { countdownId } = useParams({
    from: '/(countdown)/countdown/$countdownId/edit/',
  })

  // Validate countdownId
  if (countdownId === 'undefined') {
    throw new Error('Invalid countdown ID')
  }

  const { data: defaultCountdown } = useSuspenseQuery(
    convexQuery(api.countdowns.getById, {
      id: countdownId as Id<'countdowns'>,
    }),
  )

  if (!defaultCountdown) {
    throw new Error('Countdown not found')
  }

  const updateCountdownMutation = useMutation({
    mutationFn: useConvexMutation(api.countdowns.update),
  })

  const deleteCountdownMutation = useMutation({
    mutationFn: useConvexMutation(api.countdowns.remove),
  })

  const invalidateCountdownsQuery = () => {
    void queryClient.invalidateQueries({
      queryKey: countdownsQueryOptions().queryKey,
    })
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: defaultCountdown.name,
      startDate: defaultCountdown.startDate,
      endDate: defaultCountdown.endDate,
      weeklyDaysOff: defaultCountdown.weeklyDaysOff,
      additionalDaysOff: defaultCountdown.additionalDaysOff,
    },
  })

  const [name, startDate, endDate, weeklyDaysOff, additionalDaysOff] = useWatch(
    {
      control: form.control,
      name: [
        'name',
        'startDate',
        'endDate',
        'weeklyDaysOff',
        'additionalDaysOff',
      ],
    },
  )
  const watchedValues = { startDate, endDate, weeklyDaysOff, additionalDaysOff }

  // Filter out additional days off that are outside the date range
  useEffect(() => {
    const currentAdditionalDays = form.getValues('additionalDaysOff')
    const filteredDays = currentAdditionalDays.filter(
      (timestamp) =>
        (isSameDay(timestamp, startDate) || isAfter(timestamp, startDate)) &&
        (isSameDay(timestamp, endDate) || isBefore(timestamp, endDate)),
    )

    // Only update if there's a difference to avoid infinite loops
    if (filteredDays.length !== currentAdditionalDays.length) {
      form.setValue('additionalDaysOff', filteredDays)
    }
  }, [startDate, endDate, form])

  const getMonthsBetweenDates = (start: number, end: number): Array<number> => {
    const months: Array<number> = []
    let current = startOfMonth(start)
    const endMonth = startOfMonth(end)

    while (current <= endMonth) {
      months.push(current.getTime())
      current = addMonths(current, 1)
    }

    return months
  }

  const isWeeklyDayOff = (timestamp: number): boolean => {
    return weeklyDaysOff.includes(getDay(timestamp))
  }

  const handleWeeklyDayToggle = (dayValue: number) => {
    const currentWeeklyDaysOff = form.getValues('weeklyDaysOff')
    const isAddingDay = !currentWeeklyDaysOff.includes(dayValue)

    const newWeeklyDaysOff = isAddingDay
      ? [...currentWeeklyDaysOff, dayValue]
      : currentWeeklyDaysOff.filter((d) => d !== dayValue)

    newWeeklyDaysOff.sort((a, b) => a - b)
    form.setValue('weeklyDaysOff', newWeeklyDaysOff)

    // If a weekly day off was added, remove any additional days off that fall on that day
    if (isAddingDay) {
      const currentAdditionalDaysOff = form.getValues('additionalDaysOff')
      const updatedAdditionalDaysOff = currentAdditionalDaysOff.filter(
        (timestamp) => getDay(timestamp) !== dayValue,
      )

      if (updatedAdditionalDaysOff.length !== currentAdditionalDaysOff.length) {
        form.setValue('additionalDaysOff', updatedAdditionalDaysOff)
      }
    }
  }

  const onSubmit = (data: FormData) => {
    updateCountdownMutation.mutate(
      {
        id: countdownId as Id<'countdowns'>,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        weeklyDaysOff: data.weeklyDaysOff,
        additionalDaysOff: data.additionalDaysOff,
      },
      {
        onSuccess: () => {
          invalidateCountdownsQuery()

          void navigate({
            to: '/countdown/$countdownId',
            params: {
              countdownId,
            },
          })
        },
        onError: (error) => {
          if (error.message.includes('Countdown name already exists')) {
            form.setError('name', {
              type: 'manual',
              message: 'Countdown name already exists.',
            })
          }

          toast.error('Failed to edit countdown', {
            description: error.message,
            descriptionClassName: '!text-destructive',
          })
          console.error('Failed to edit countdown:', error)
        },
      },
    )
  }

  const handleDelete = () => {
    deleteCountdownMutation.mutate(
      {
        id: countdownId as Id<'countdowns'>,
      },
      {
        onSuccess: () => {
          invalidateCountdownsQuery()

          void navigate({
            to: '/dashboard',
          })
        },
        onError: (error) => {
          toast.error('Failed to delete countdown', {
            description: error.message,
            descriptionClassName: '!text-destructive',
          })
          console.error('Failed to delete countdown:', error)
        },
      },
    )
  }

  const handleReset = () => {
    form.reset({
      name: defaultCountdown.name,
      startDate: defaultCountdown.startDate,
      endDate: defaultCountdown.endDate,
      weeklyDaysOff: defaultCountdown.weeklyDaysOff,
      additionalDaysOff: defaultCountdown.additionalDaysOff,
    })
  }

  const isFormComplete = Boolean(form.formState.isValid && name.trim().length)

  const months =
    startDate && endDate ? getMonthsBetweenDates(startDate, endDate) : []

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
  }
}
