import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, CalendarDays, Users, Sparkles, Palette } from "lucide-react";
import Link from "next/link";

export const MarketingView = async () => {
  return (
    <div className="container px-4 py-12 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
            School
          </span>{" "}
          Days Left
        </h1>

        <p className="text-muted-foreground max-w-xl text-lg sm:text-xl md:text-2xl">
          The simple, visual way for teachers to count down the days until
          summer break.
        </p>

        <div className="mt-6 mb-10">
          <Button
            asChild
            size="lg"
            variant="default"
            className="min-w-[240px] gap-2"
          >
            <Link href="/dashboard">
              <School className="h-5 w-5" />
              Start Your Countdown
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <Card className="text-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Separate Countdowns
              </CardTitle>
              <Users className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Track both teacher workdays and student school days separately.
              </p>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Easy Setup</CardTitle>
              <CalendarDays className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Set start/end dates, then easily mark off holidays and non-work
                days.
              </p>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Daily Motivation
              </CardTitle>
              <Sparkles className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Optional daily inspirational quotes to keep spirits high.
              </p>
            </CardContent>
          </Card>

          <Card className="text-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Colorful Themes
              </CardTitle>
              <Palette className="text-muted-foreground h-5 w-5" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Personalize your countdown with multiple color themes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
