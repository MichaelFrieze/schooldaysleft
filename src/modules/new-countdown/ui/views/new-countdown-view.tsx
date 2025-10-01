import { NewCountdownForm } from "@/modules/new-countdown/ui/components/new-countdown-form";

export function NewCountdownView() {
	return (
		<div className="container mx-auto py-8">
			<div className="pb-8 text-center">
				<h1 className="font-bold text-3xl">Create New Countdown</h1>
				<p className="pt-2 text-muted-foreground">
					Set up your countdown with custom dates and days off.
				</p>
			</div>
			<NewCountdownForm />
		</div>
	);
}
