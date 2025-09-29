import { Button } from "@/components/ui/button";
import { clickHandlers } from "@/lib/utils";
import { EditCountdownForm } from "@/modules/edit-countdown/ui/components/edit-countdown-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface EditCountdownViewProps {
	countdownId: string;
}

export const EditCountdownView = ({ countdownId }: EditCountdownViewProps) => {
	const navigate = useNavigate();

	return (
		<div className="container pt-4 pb-8">
			<div className="pb-8">
				<div className="pb-8">
					<Button asChild variant="ghost">
						<Link
							to="/countdown/$countdownId"
							params={{ countdownId }}
							{...clickHandlers(() =>
								navigate({
									to: "/countdown/$countdownId",
									params: { countdownId },
								}),
							)}
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Countdown
						</Link>
					</Button>
				</div>
				<div className="text-center">
					<h1 className="pb-2 font-bold text-3xl">Edit Countdown</h1>
				</div>
			</div>
			<EditCountdownForm />
		</div>
	);
};
