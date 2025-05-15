import Link from "next/link";
import { Suspense } from "react";
import { CountdownNavItems } from "./countdown-nav-items";

export const CountdownNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </Link>

        <nav className="ml-auto">
          <Suspense>
            <CountdownNavItems />
          </Suspense>
        </nav>
      </div>
    </header>
  );
};
