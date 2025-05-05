import { MarketingNavItems } from "@/modules/marketing/ui/components/marketing-nav-items";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const MarketingNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="group flex items-center gap-1">
          <CalendarDays className="text-primary h-6 w-6 stroke-[2.5]" />

          <span className="mt-2 text-xl font-bold">
            <span className="text-primary bg-clip-text">School</span>
            DaysLeft
          </span>
        </Link>

        <div className="ml-auto hidden items-center md:flex">
          <Suspense>
            <MarketingNavItems />
          </Suspense>
        </div>
      </div>
    </header>
  );
};
