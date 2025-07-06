"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  AlertTriangle,
  ChevronDown,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export const CountdownNavDropdown = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={CountdownNavDropdownError}
      onReset={reset}
    >
      <Suspense fallback={<CountdownNavDropdownLoading />}>
        <CountdownNavDropdownSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

const CountdownNavDropdownSuspense = () => {
  const pathname = usePathname();
  const trpc = useTRPC();

  const { data: countdowns } = useSuspenseQuery({
    ...trpc.countdown.getAll.queryOptions(),
    retry: false,
  });

  const getCurrentPageName = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/countdown/new") return "New Countdown";

    if (pathname.endsWith("/edit")) {
      const countdownId = pathname.split("/")[2];
      const currentCountdown = countdowns.find((c) => c.id === countdownId);
      return currentCountdown?.name;
    }

    const countdownId = pathname.split("/").pop();
    const currentCountdown = countdowns.find((c) => c.id === countdownId);

    return currentCountdown?.name;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="max-w-64 min-w-0 gap-2 focus-visible:ring-1"
        >
          <span className="min-w-0 flex-1 truncate">
            {getCurrentPageName()}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-45">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className={cn(
              pathname === "/dashboard" && "bg-accent text-accent-foreground",
            )}
          >
            <LayoutDashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {countdowns?.map((countdown) => (
          <DropdownMenuItem key={countdown.id} asChild>
            <Link
              href={`/countdown/${countdown.id}`}
              className={cn(
                pathname === `/countdown/${countdown.id}` &&
                  "bg-accent text-accent-foreground",
              )}
            >
              {countdown.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/countdown/new"
            className={cn(
              pathname === "/countdown/new" &&
                "bg-accent text-accent-foreground",
            )}
          >
            <Plus />
            New Countdown
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CountdownNavDropdownLoading = () => {
  return (
    <Button
      variant="ghost"
      className="max-w-64 min-w-0 [animation:delayed-fade-in_.5s_ease-out] gap-2 focus-visible:ring-1"
    >
      <Skeleton className="h-5 w-32" />
      <ChevronDown className="h-4 w-4 shrink-0" />
    </Button>
  );
};

const CountdownNavDropdownError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Button variant="ghost" onClick={resetErrorBoundary} className="gap-2">
      <AlertTriangle className="text-destructive h-4 w-4 shrink-0" />
      <span className="text-destructive truncate">Error</span>
    </Button>
  );
};
