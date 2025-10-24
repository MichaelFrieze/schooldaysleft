import type { FormData } from '@/modules/new-countdown/hooks/use-countdown-form'
import type { UseFormReturn } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatePickerField } from '@/modules/new-countdown/ui/components/form-fields/date-picker-field'

interface NameAndDatesSectionProps {
  form: UseFormReturn<FormData>
  startDate?: number
}

export function NameAndDatesSection({
  form,
  startDate,
}: NameAndDatesSectionProps) {
  return (
    <Card>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Countdown Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., School Year 2024-25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <DatePickerField
                  field={field}
                  placeholder="Select start date"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <DatePickerField
                  field={field}
                  placeholder="Select end date"
                  disabled={(date) => {
                    // Only disable dates that are before the start date
                    if (startDate != null) {
                      return date.getTime() <= startDate
                    }
                    return false
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
