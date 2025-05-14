import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CalendarDays,
  PenLine,
  School,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";

export const HomeView = async () => {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-8 lg:py-24">
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="mx-auto flex max-w-xs flex-col justify-center sm:max-w-xl">
            <h1 className="text-left text-4xl leading-tight font-bold tracking-tighter sm:text-center sm:text-6xl">
              <span className="text-primary bg-clip-text">Countdown</span>{" "}
            </h1>
            <h1 className="mb-6 text-left text-4xl leading-tight font-bold tracking-tighter sm:text-center sm:text-6xl">
              To Your Next Break
            </h1>

            <p className="text-muted-foreground mb-8 text-lg sm:text-center">
              Track the days remaining until holidays, summer vacation, or any
              time off. Stay motivated and see the finish line.
            </p>

            <Button
              asChild
              size="lg"
              variant="default"
              className="gap-2 sm:mx-auto sm:w-sm"
            >
              <Link href="/dashboard">
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </Button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-1 gap-12 lg:grid lg:grid-cols-2">
          <div className="flex max-w-lg flex-col justify-center">
            <h1 className="mb-6 text-6xl leading-tight font-bold tracking-tighter">
              <span className="text-primary bg-clip-text">Countdown</span> to
              Your Next Break
            </h1>

            <p className="text-muted-foreground mb-8 max-w-xl text-lg">
              Track the days remaining until holidays, summer vacation, or any
              time off. Stay motivated and see the finish line.
            </p>

            <Button
              asChild
              size="lg"
              variant="default"
              className="min-w-[240px] gap-2"
            >
              <Link href="/dashboard">
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </Button>
          </div>

          <Card className="border-border/40 bg-background overflow-hidden rounded-xl border shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6 flex items-start justify-between">
                <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full">
                  <School className="text-primary h-8 w-8" />
                </div>

                <div className="text-muted-foreground hover:text-foreground h-8 w-8">
                  <Settings className="h-4 w-4" />
                </div>
              </div>

              <div className="text-center">
                <div className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums md:text-9xl">
                  15
                </div>
                <p className="text-muted-foreground mt-1 text-lg font-medium">
                  days to go!
                </p>
              </div>

              <div className="mt-8 flex justify-center space-x-6">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Monday-Friday
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Weekends Off
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Progress value={87} className="h-2.5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="mb-2">
                <User className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Separate Countdowns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track both teacher workdays and student school days separately.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="mb-2">
                <Settings className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Easy Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Set start/end dates, then easily mark off holidays and non-work
                days.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="mb-2">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Daily Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optional daily inspirational quotes to keep spirits high.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="mb-2">
                <PenLine className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Colorful Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Personalize your countdown with multiple color themes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
