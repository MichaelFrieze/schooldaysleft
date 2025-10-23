import { Button } from "@/components/ui/button";
import { FastLink } from "@/components/ui/fast-link";
import { Skeleton } from "@/components/ui/skeleton";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Edit } from "lucide-react";
import { Suspense } from "react";

interface CountdownHeaderSectionProps {
	countdownId: string;
}

export function CountdownHeaderSection({
	countdownId,
}: CountdownHeaderSectionProps) {
	return (
		<Suspense fallback={<CountdownHeaderSectionLoading />}>
			<CountdownHeaderSectionSuspense countdownId={countdownId} />
		</Suspense>
	);
}

function CountdownHeaderSectionSuspense({
	countdownId,
}: CountdownHeaderSectionProps) {
	const { data: countdown } = useSuspenseQuery(
		convexQuery(api.countdowns.getById, {
			id: countdownId as Id<"countdowns">,
		}),
	);

	if (!countdown) {
		throw new Error("Countdown not found");
	}

	return (
		<section className="py-8 md:py-12">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-2">
					<h1 className="font-bold text-3xl tracking-tight md:text-4xl">
						{countdown.name}
					</h1>
				</div>

				<Button asChild variant="outline" size="sm">
					<FastLink to="/countdown/$countdownId/edit" params={{ countdownId }}>
						<Edit className="h-4 w-4" />
						Edit
					</FastLink>
				</Button>
			</div>
		</section>
	);
}

function CountdownHeaderSectionLoading() {
	return (
		<section className="py-8 [animation:delayed-fade-in_.5s_ease-out] md:py-12">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-2">
					<Skeleton className="h-9 w-full rounded-md md:h-10 md:w-lg" />
				</div>
				<Skeleton className="h-8 w-full rounded-md md:h-9 md:w-18" />
			</div>
		</section>
	);
}
