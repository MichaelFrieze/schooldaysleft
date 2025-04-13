import Link from "next/link";
import { Button } from "~/components/ui/button";
import { CalendarDays, School, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <CalendarDays className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          School Days Left
        </h1>

        <p className="text-xl text-muted-foreground">
          The simple way for teachers to count down the days until summer break
        </p>

        <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="flex-1 gap-2">
            <Link href="/countdown">
              <School className="h-5 w-5" />
              Teacher Countdown
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1 gap-2">
            <Link href="/student/countdown">
              <GraduationCap className="h-5 w-5" />
              Student Countdown
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Separate Countdowns</h3>
            <p className="text-muted-foreground">
              Track both teacher and student days left until summer break.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Easy Setup</h3>
            <p className="text-muted-foreground">
              Set your start and end dates, then customize your days off.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Daily Motivation</h3>
            <p className="text-muted-foreground">
              Get a new inspirational quote each day to keep you going.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
