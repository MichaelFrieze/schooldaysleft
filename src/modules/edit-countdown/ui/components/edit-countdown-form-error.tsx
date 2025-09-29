import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export const EditCountdownFormError = ({
	resetErrorBoundary,
}: FallbackProps) => {
	return (
		<div
			className="mx-auto flex min-h-[400px] max-w-4xl flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
			role="alert"
		>
			<AlertTriangle className="mb-4 h-12 w-12 text-destructive" />
			<h3 className="mb-2 font-medium text-lg">Something went wrong</h3>
			<p className="max-w-sm text-muted-foreground text-sm">
				There was an issue loading the form to edit your countdown. Please try
				again.
			</p>
			<Button onClick={resetErrorBoundary} variant="outline" className="mt-6">
				Try Again
			</Button>
		</div>
	);
};
