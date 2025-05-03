import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { db } from "@/server/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";

function formatDate(date: Date | null | undefined): string {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function CountdownDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch all countdowns for the logged-in user
  // const countdowns = await db.countdown.findMany({
  //   where: { userId: userId },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     endDate: true,
  //   },
  // });

  // Temporary mock data until DB is connected
  const countdowns = [
    {
      id: "clq1234567",
      name: "New Year 2025",
      endDate: new Date("2025-01-01"),
      createdAt: new Date("2023-12-25"),
    },
    {
      id: "clq2345678",
      name: "Summer Vacation",
      endDate: new Date("2024-06-15"),
      createdAt: new Date("2023-12-26"),
    },
    {
      id: "clq3456789",
      name: "Wedding Day",
      endDate: new Date("2024-09-30"),
      createdAt: new Date("2023-12-27"),
    },
    {
      id: "clq4567890",
      name: "Project Deadline",
      endDate: new Date("2024-03-31"),
      createdAt: new Date("2023-12-28"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Countdowns
          </h1>
        </div>
        <Button asChild>
          <Link href="/countdown/new">
            <Plus className="mr-1 h-4 w-4" />
            Create New Countdown
          </Link>
        </Button>
      </div>

      <Separator className="mb-8" />

      {false ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground mt-2 mb-4 text-sm">
            You haven&apos;t created any countdowns yet.
          </p>
          <Button asChild variant="secondary">
            <Link href="/countdown/new">
              <Plus className="mr-1 h-4 w-4" />
              Create Your First Countdown
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countdowns.map((countdown) => (
            <Link
              href={`/countdown/${countdown.id}`}
              key={countdown.id}
              className="block transition-transform duration-150 ease-in-out hover:scale-[1.02]"
              aria-label={`View countdown: ${countdown.name}`}
            >
              <Card className="h-full overflow-hidden hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="truncate text-xl font-semibold">
                    {countdown.name}
                  </CardTitle>
                  {countdown.endDate && (
                    <CardDescription className="text-muted-foreground text-sm">
                      Ends on: {formatDate(countdown.endDate)}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-2">
                    <div className="bg-primary/10 h-2 rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(
                              100,
                              ((new Date(countdown.endDate).getTime() -
                                Date.now()) /
                                (new Date(countdown.endDate).getTime() -
                                  new Date(countdown.createdAt).getTime())) *
                                100,
                            ),
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Time remaining:{" "}
                      {Math.ceil(
                        (new Date(countdown.endDate).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
