import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
	Calendar,
	CalendarDays,
	LayoutGrid,
	PieChart,
	SlidersHorizontal,
} from "lucide-react";

export const LandingContent = () => {
	return (
		<div className="container">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-8 lg:py-24">
				{/* Background accent / banding mitigation */}
				<div className="-z-10 pointer-events-none absolute inset-0">
					<div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-20%,hsl(var(--primary)/0.08),transparent_60%)]" />
				</div>
				{/* Mobile */}
				<div className="lg:hidden">
					<div className="mx-auto flex max-w-xs flex-col justify-center sm:max-w-xl">
						<h1 className="text-left font-bold text-4xl leading-tight tracking-tighter sm:text-center sm:text-6xl">
							<span className="bg-clip-text text-primary">Countdown</span> the
						</h1>
						<h1 className="mb-6 text-left font-bold text-4xl leading-tight tracking-tighter sm:text-center sm:text-6xl">
							School Days Left
						</h1>

						<p className="mb-8 text-lg text-muted-foreground sm:text-center">
							Create custom countdowns for important dates like summer break,
							winter break, end of semester, or any other dates that matter most
							to you.
						</p>

						<Link
							to="/"
							className={buttonVariants({
								variant: "default",
								size: "lg",
								className:
									"gap-2 shadow-primary/10 shadow-sm ring-1 ring-primary/20 transition-colors duration-200 ease-out hover:shadow-md hover:shadow-primary/20 hover:ring-primary/30 motion-reduce:transition-none sm:mx-auto sm:w-sm",
							})}
						>
							<CalendarDays className="h-5 w-5" />
							Start Your Countdown
						</Link>
					</div>
				</div>

				{/* Desktop */}
				<div className="hidden grid-cols-1 gap-12 lg:grid lg:grid-cols-2">
					<div className="flex max-w-lg flex-col justify-center">
						<h1 className="mb-6 font-bold text-6xl leading-tight tracking-tighter">
							<span className="bg-clip-text text-primary">Countdown</span> the
							School Days Left
						</h1>

						<p className="mb-8 max-w-xl text-lg text-muted-foreground">
							Create custom countdowns for important dates like summer break,
							winter break, end of semester, or any other dates that matter most
							to you.
						</p>

						<Link
							to="/"
							className={buttonVariants({
								variant: "default",
								size: "lg",
								className:
									"min-w-[240px] gap-2 shadow-primary/10 shadow-sm ring-1 ring-primary/20 transition-colors duration-200 ease-out hover:shadow-lg hover:shadow-primary/25 hover:ring-primary/30 motion-reduce:transition-none",
							})}
						>
							<CalendarDays className="h-5 w-5" />
							Start Your Countdown
						</Link>
					</div>

					<Card className="relative overflow-hidden rounded-2xl border border-black/5 bg-background/60 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(0,0,0,0.18)] backdrop-blur supports-[backdrop-filter]:bg-background/50 dark:border-white/5 dark:shadow-[0_1px_2px_rgba(0,0,0,0.6),0_12px_24px_-8px_rgba(0,0,0,0.7)]">
						{/* subtle inner highlight for crisp edge */}
						<div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent_85%)]">
							<div className="absolute inset-x-0 top-0 h-px bg-white/40 dark:bg-white/10" />
						</div>
						<CardContent className="p-8">
							<div className="pb-8">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span className="font-medium text-sm">
										Friday, May 23, 2025
									</span>
								</div>
							</div>

							<div className="text-center">
								<div className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text font-extrabold text-8xl text-transparent tabular-nums">
									15
								</div>
								<p className="pt-2 font-medium text-muted-foreground text-xl">
									days left!
								</p>
							</div>

							<div className="pt-8">
								<div className="flex items-center justify-between pb-2">
									<span className="font-medium text-muted-foreground text-sm">
										Progress
									</span>
									<span className="font-medium text-muted-foreground text-sm">
										92%
									</span>
								</div>
								<Progress
									value={92}
									className="h-3 rounded-full border border-black/5 bg-muted/40 ring-1 ring-primary/10 dark:border-white/5"
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-8 lg:py-24">
				<div className="mx-auto grid max-w-xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-full lg:grid-cols-3">
					<Card className="motion-safe:hover:-translate-y-0.5 rounded-2xl border border-black/5 shadow-sm transition-transform duration-200 ease-out hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/5">
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-primary/10 shadow-sm">
								<LayoutGrid className="h-8 w-8 text-primary" />
							</div>
							<CardTitle>Multiple Countdowns</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Teachers, students, and parents can create and manage as many
								countdowns as they need.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="motion-safe:hover:-translate-y-0.5 rounded-2xl border border-black/5 shadow-sm transition-transform duration-200 ease-out hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/5">
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-primary/10 shadow-sm">
								<SlidersHorizontal className="h-8 w-8 text-primary" />
							</div>
							<CardTitle>Flexible Scheduling</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Easily set your start and end date, mark weekly days off, and
								add additional holidays and breaks.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="motion-safe:hover:-translate-y-0.5 rounded-2xl border border-black/5 shadow-sm transition-transform duration-200 ease-out hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/5">
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-primary/10 shadow-sm">
								<PieChart className="h-8 w-8 text-primary" />
							</div>
							<CardTitle>Progress Tracking</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Track days completed and days remaining with a visual countdown
								and progress bar.
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
};
