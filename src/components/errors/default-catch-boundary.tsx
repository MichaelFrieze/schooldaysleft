import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";

import { tryCatch } from "@/lib/try-catch";

import { Button } from "../ui/button";

export function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error(error);

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />
			<div className="flex flex-wrap items-center gap-2">
				<Button
					onClick={reset}
					className="cursor-pointer px-2 py-1 font-extrabold"
					variant="outline"
				>
					Try Again
				</Button>
				<Button
					onClick={async () => {
						const result = await tryCatch(router.invalidate());

						if (result.error) {
							console.warn("Failed to invalidate data:", result.error);
						}

						reset();
					}}
					className="cursor-pointer px-2 py-1 font-extrabold"
					variant="outline"
				>
					Invalidate Data
				</Button>
				{isRoot ? (
					<Button asChild className="px-2 py-1 font-extrabold">
						<Link to="/">Home</Link>
					</Button>
				) : (
					<Button asChild className="px-2 py-1 font-extrabold">
						<Link
							to="/"
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							Go Back
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
