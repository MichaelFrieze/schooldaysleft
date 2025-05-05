import { MarketingNavItems } from "@/modules/marketing/ui/components/marketing-nav-items";
import Link from "next/link";
import { Suspense } from "react";

export const MarketingNavbar = () => {
  return (
    <header>
      <div className="container flex h-16 items-center">
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary bg-clip-text">School</span>
            DaysLeft
          </span>
        </Link>

        <div className="ml-auto flex items-center">
          <Suspense>
            <MarketingNavItems />
          </Suspense>
        </div>
      </div>
    </header>
  );
};
