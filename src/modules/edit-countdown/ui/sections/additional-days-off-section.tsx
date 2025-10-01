import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import type { FormData } from "@/modules/edit-countdown/hooks/use-countdown-form";
import { isSameMonth } from "date-fns";
import type { UseFormReturn } from "react-hook-form";

interface AdditionalDaysOffSectionProps {
	form: UseFormReturn<FormData>;
	startDate: number;
	endDate: number;
	additionalDaysOff: number[];
	months: number[];
	isWeeklyDayOff: (timestamp: number) => boolean;
}

export const AdditionalDaysOffSection = ({
	form,
	startDate,
	endDate,
	additionalDaysOff,
	months,
	isWeeklyDayOff,
}: AdditionalDaysOffSectionProps) => {
	return (
		<Card>
			<CardContent className="space-y-6">
				<p className="text-muted-foreground text-sm">
					Select specific dates that will be days off (holidays, breaks, etc.)
				</p>

				<FormField
					control={form.control}
					name="additionalDaysOff"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								{months.length > 0 && (
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
										{months.map((month) => (
											<div key={month} className="space-y-2">
												<div className="flex justify-center rounded-md border p-3">
													<Calendar
														mode="multiple"
														month={new Date(month)}
														selected={field.value
															.filter((timestamp) =>
																isSameMonth(timestamp, month),
															)
															.map((timestamp) => new Date(timestamp))}
														onSelect={(dates) => {
															if (!dates) return;

															const otherMonthDates = field.value.filter(
																(timestamp) => !isSameMonth(timestamp, month),
															);

															const selectedTimestamps = dates.map((d) =>
																d.getTime(),
															);

															field.onChange([
																...otherMonthDates,
																...selectedTimestamps,
															]);
														}}
														disabled={(date) =>
															!isSameMonth(date, month) ||
															isWeeklyDayOff(date.getTime()) ||
															date.getTime() < startDate ||
															date.getTime() > endDate
														}
														disableNavigation={true}
														fixedWeeks={true}
													/>
												</div>
											</div>
										))}
									</div>
								)}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{additionalDaysOff.length > 0 && (
					<div className="rounded-md bg-muted p-4">
						<div className="flex items-center gap-2">
							<div className="h-2 w-2 rounded-full bg-primary" />
							<p className="font-medium text-sm">
								{additionalDaysOff.length} additional days selected
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
