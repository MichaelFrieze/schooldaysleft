import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import { Footer } from "../sections/footer";
import { Button, buttonVariants } from "../ui/button";

export function RootCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<div className="flex min-h-screen w-full flex-col bg-background text-foreground">
			<header className="border-b">
				<div className="container flex h-16 items-center">
					<Link to="/" className="group flex items-center gap-1">
						<span className="font-bold text-2xl">
							<span className="text-primary">School</span>
							DaysLeft
						</span>
					</Link>
				</div>
			</header>

			<main className="container mx-auto flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
				<div className="w-full max-w-3xl rounded-lg border bg-card p-6 shadow sm:p-8">
					<h1 className="mb-2 font-extrabold text-3xl">Something went wrong</h1>
					<p className="mb-4 text-muted-foreground">
						An unexpected error occurred. You can try again, go home, or reload
						the page.
					</p>

					<div className="mb-6">
						{typeof error === "object" && error !== null ? (
							(() => {
								const e = error as unknown as Record<string, unknown>;
								return (
									<div className="rounded border bg-muted p-4">
										{/* Collapse to a single column on small screens */}
										<div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
											<div>
												<div className="text-muted-foreground text-xs">
													Type
												</div>
												<div className="font-medium">
													{String(e.name ?? "Error")}
												</div>
											</div>
											<div>
												<div className="text-muted-foreground text-xs">
													Error code
												</div>
												<div className="font-medium">
													{String(e.serverFnErrorCode ?? "—")}
												</div>
											</div>
											<div>
												<div className="text-muted-foreground text-xs">
													HTTP Code
												</div>
												<div className="font-medium">
													{String(e.httpStatusCode ?? "—")}
												</div>
											</div>
										</div>

										<div className="mt-3 text-muted-foreground text-xs">
											If this keeps happening, please contact support and
											include the error code above.
										</div>
									</div>
								);
							})()
						) : (
							<div className="rounded border bg-muted p-3 text-sm">
								{String(error)}
							</div>
						)}
					</div>

					{/* Center buttons on small screens, align start on larger */}
					<div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
						<Button
							onClick={() => {
								router.invalidate();
							}}
							className="cursor-pointer"
						>
							Try Again
						</Button>
						<Link to="/" className={buttonVariants({ variant: "default" })}>
							Go Home
						</Link>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
