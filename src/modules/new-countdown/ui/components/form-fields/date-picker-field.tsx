import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface DatePickerFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  placeholder: string;
  disabled?: (date: Date) => boolean;
}

const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

export const DatePickerField = <T extends FieldValues>({
  field,
  placeholder,
  disabled,
}: DatePickerFieldProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isDate(field.value)
              ? format(field.value, "MMMM d, yyyy")
              : placeholder}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isDate(field.value) ? field.value : undefined}
          onSelect={(date) => {
            field.onChange(date);
            setOpen(false);
          }}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
