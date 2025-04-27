"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const MarketingNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CalendarDays className="text-primary h-5 w-5" />
          <span>schooldaysleft</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
