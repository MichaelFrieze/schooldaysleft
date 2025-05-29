"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, Plus } from "lucide-react";
import Link from "next/link";
import { DashboardCountdownCard } from "./dashboard-countdown-card";

export const DashboardContent = () => {
  const trpc = useTRPC();

  const { data: countdowns } = useSuspenseQuery({
    ...trpc.countdown.getAll.queryOptions(),
  });

  if (countdowns.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countdowns.map((countdown) => {
        return (
          <DashboardCountdownCard key={countdown.id} countdown={countdown} />
        );
      })}
    </div>
  );
};
