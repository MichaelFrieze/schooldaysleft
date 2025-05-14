import { Calendar, CalendarDays, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { auth } from "@clerk/nextjs/server";

function formatDate(date: Date | null | undefined): string {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export const DashboardView = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Temporary mock data until DB is connected
  const countdowns = [
    {
      id: "clq1234567",
      name: "Summer Break 2024",
      endDate: new Date("2026-06-21"),
      createdAt: new Date("2023-12-25"),
    },
    {
      id: "clq2345678",
      name: "Spring Break",
      endDate: new Date("2026-03-25"),
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "clq3456789",
      name: "Winter Break",
      endDate: new Date("2025-12-22"),
      createdAt: new Date("2023-12-01"),
    },
    {
      id: "clq4567890",
      name: "Teacher Planning Day",
      endDate: new Date("2027-01-26"),
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "clq5678901",
      name: "Last Day of School",
      endDate: new Date("2025-06-21"),
      createdAt: new Date("2024-01-02"),
    },
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-row items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          {/* <p className="text-muted-foreground">
            Your dashboard for all school-related countdowns.
          </p> */}
        </div>
        <Button asChild>
          <Link href="/countdown/new">
            <Plus className="h-4 w-4" />
            New Countdown
          </Link>
        </Button>
      </div>

      {/* <Separator className="mb-8" /> */}

      {false ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <CalendarDays className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-medium">No Countdowns Yet</h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            Create your first countdown to track the days left until your next
            break or the end of the school year.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/countdown/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Countdown
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countdowns.map((countdown) => {
            const startDate = new Date(countdown.createdAt).getTime();
            const endDate = new Date(countdown.endDate).getTime();
            const now = Date.now();

            let progressValue = 100; // Default to 100% (full progress)
            const timeRemaining = endDate - now;
            const totalDuration = endDate - startDate;

            if (totalDuration > 0) {
              // Calculate progress as percentage of time elapsed
              progressValue =
                100 -
                Math.max(
                  0, // Ensure progress doesn't go below 0
                  Math.min(100, (timeRemaining / totalDuration) * 100), // Clamp at 100
                );
            }

            // If past end date, show 100% progress
            if (now > endDate) {
              progressValue = 100;
            }

            return (
              <Link
                href={`/countdown/${countdown.id}`}
                key={countdown.id}
                className="transition-transform duration-150 ease-in-out hover:scale-[1.01]"
                aria-label={`View countdown: ${countdown.name}`}
              >
                <Card className="h-full overflow-hidden hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="truncate text-lg font-medium">
                      {countdown.name}
                    </CardTitle>
                    {countdown.endDate && (
                      <CardDescription className="text-muted-foreground/90 flex items-center gap-1.5 text-sm font-medium">
                        <Calendar className="h-4 w-4" />
                        Ends on: {formatDate(countdown.endDate)}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Progress value={progressValue} className="h-3" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
