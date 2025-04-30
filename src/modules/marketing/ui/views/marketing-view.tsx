import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";
import { CalendarDays, GraduationCap, School } from "lucide-react";
import Link from "next/link";

export const MarketingView = async () => {
  // const post = await caller.post.getLatest();
  // console.log({ post });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
        <div className="bg-primary/10 rounded-full p-3">
          <CalendarDays className="text-primary h-12 w-12" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          School Days Left
        </h1>

        <p className="text-muted-foreground text-xl">
          The simple way for teachers to count down the days until summer break
        </p>

        <div className="mt-4 mb-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            variant="default"
            className="w-full gap-2 sm:flex-1"
          >
            <Link href="/countdown" className="w-full">
              <School className="h-5 w-5" />
              Teacher Countdown
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full gap-2 sm:flex-1"
          >
            <Link href="/student/countdown" className="w-full">
              <GraduationCap className="h-5 w-5" />
              Student Countdown
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-card rounded-lg border p-6 shadow-xs">
            <h3 className="mb-2 text-lg font-semibold">Separate Countdowns</h3>
            <p className="text-muted-foreground">
              Track both teacher and student days left until summer break.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-xs">
            <h3 className="mb-2 text-lg font-semibold">Easy Setup</h3>
            <p className="text-muted-foreground">
              Set your start and end dates, then customize your days off.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-xs">
            <h3 className="mb-2 text-lg font-semibold">Daily Motivation</h3>
            <p className="text-muted-foreground">
              Optional daily inspirational quotes to brighten your day.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-xs">
            <h3 className="mb-2 text-lg font-semibold">Colorful Themes</h3>
            <p className="text-muted-foreground">
              Make it yours with multiple color themes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
