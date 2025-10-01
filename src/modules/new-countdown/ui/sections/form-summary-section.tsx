import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DAYS_OF_WEEK } from "@/lib/constants";
import type { FormData } from "@/modules/new-countdown/hooks/use-countdown-form";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface FormSummarySectionProps {
	form: UseFormReturn<FormData>;
	startDate: number;
	endDate: number;
	weeklyDaysOff: number[];
	additionalDaysOff: number[];
	onClear: () => void;
	isSubmitting: boolean;
}

export function FormSummarySection({
	form,
	startDate,
	endDate,
	weeklyDaysOff,
	additionalDaysOff,
	onClear,
	isSubmitting,
}: FormSummarySectionProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Summary</CardTitle>
				<p className="text-muted-foreground text-sm">
					Review your countdown settings before creating
				</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div>
						<h3 className="font-medium">Countdown Name</h3>
						<p className="text-muted-foreground text-sm">
							{form.getValues("name")}
						</p>
					</div>

					<Separator />

					<div>
						<h3 className="font-medium">School Year Period</h3>
						<p className="text-muted-foreground text-sm">
							{format(startDate, "MMMM d, yyyy")} -{" "}
							{format(endDate, "MMMM d, yyyy")}
						</p>
					</div>

					<Separator />

					<div>
						<h3 className="font-medium">Weekly Days Off</h3>
						<p className="text-muted-foreground text-sm">
							{weeklyDaysOff.length > 0
								? weeklyDaysOff
										.map(
											(dayValue) =>
												DAYS_OF_WEEK.find((d) => d.value === dayValue)?.label,
										)
										.join(", ")
								: "None selected"}
						</p>
					</div>

					<Separator />

					<div>
						<h3 className="font-medium">Additional Days Off</h3>
						<p className="text-muted-foreground text-sm">
							{additionalDaysOff.length} additional days selected
						</p>
					</div>
				</div>

				<div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								type="button"
								variant="outline"
								className="flex-1 sm:flex-none"
							>
								Clear All
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="w-[calc(100vw-4rem)] max-w-sm">
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This will permanently clear all the information you have
									entered in the form.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={onClear}
									className={buttonVariants({ variant: "destructive" })}
								>
									Clear Form
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Button type="submit" disabled={isSubmitting} className="sm:w-40">
						{isSubmitting ? (
							<div className="flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" />
								Creating...
							</div>
						) : (
							"Create Countdown"
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
