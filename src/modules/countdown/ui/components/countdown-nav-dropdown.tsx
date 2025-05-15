"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CountdownNavDropdown = () => {
  const pathname = usePathname();

  // Temporary mock data until connected to DB
  const countdowns = [
    { id: "1", name: "Summer Break 2024" },
    { id: "2", name: "Spring Break" },
    { id: "3", name: "Winter Break" },
  ];

  const getCurrentPageName = () => {
    if (pathname === "/dashboard")
      return (
        <>
          <span className="truncate">Dashboard</span>
        </>
      );
    if (pathname === "/countdown/new")
      return (
        <>
          <span className="truncate">New Countdown</span>
        </>
      );

    const countdownId = pathname.split("/").pop();
    const currentCountdown = countdowns.find((c) => c.id === countdownId);

    return (
      <span className="truncate">
        {currentCountdown?.name ?? "Select Countdown"}
      </span>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 focus-visible:ring-1">
          {getCurrentPageName()}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-45">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2",
              pathname === "/dashboard" && "bg-accent text-accent-foreground",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {countdowns.map((countdown) => (
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
              "flex items-center gap-2",
              pathname === "/countdown/new" &&
                "bg-accent text-accent-foreground",
            )}
          >
            <Plus className="h-4 w-4" />
            New Countdown
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
