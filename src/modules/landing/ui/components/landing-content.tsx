import { Button } from "@/components/ui/button";
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
	Palette,
	PieChart,
	SlidersHorizontal,
} from "lucide-react";

export const LandingContent = () => {
	return (
		<div className="container">
			{/* Hero Section */}
			<section className="py-8 lg:py-24">
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

						<Button
							asChild
							size="lg"
							variant="default"
							className="gap-2 sm:mx-auto sm:w-sm"
						>
							<Link to="/">
								<CalendarDays className="h-5 w-5" />
								Start Your Countdown
							</Link>
						</Button>
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

						<Button
							asChild
							size="lg"
							variant="default"
							className="min-w-[240px] gap-2"
						>
							<Link to="/">
								<CalendarDays className="h-5 w-5" />
								Start Your Countdown
							</Link>
						</Button>
					</div>

					<Card>
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
								<Progress value={92} className="h-3" />
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Features Section */}
			<section className="mx-auto py-8 lg:py-24">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
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

					<Card>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
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

					<Card>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
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

					<Card>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
								<Palette className="h-8 w-8 text-primary" />
							</div>
							<CardTitle>Custom Themes</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Choose from multiple color themes and switch between light and
								dark modes to personalize your experience.
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
};
