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

const toDate = (value: unknown): Date | undefined => {
	if (typeof value === "number") return new Date(value);
	if (isDate(value)) return value;
	return undefined;
};

const toTimestamp = (value: Date | undefined): number | undefined => {
	return value ? value.getTime() : undefined;
};

export function DatePickerField<T extends FieldValues>({
	field,
	placeholder,
	disabled,
}: DatePickerFieldProps<T>) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal",
							!toDate(field.value) && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{(() => {
							const dateValue = toDate(field.value);
							return dateValue
								? format(dateValue, "MMMM d, yyyy")
								: placeholder;
						})()}
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={toDate(field.value)}
					onSelect={(date) => {
						field.onChange(toTimestamp(date));
						setOpen(false);
					}}
					disabled={disabled}
					defaultMonth={toDate(field.value)}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
