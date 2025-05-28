import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DashboardContent } from "../components/dashboard-content";

export const DashboardView = () => {
  return (
    <section className="container py-8 md:py-12">
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

      <DashboardContent />
    </section>
  );
};
