import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@/modules/user/ui/components/user-button";
import { trpc } from "@/trpc/server";
import { TRPCPrefetch } from "@/trpc/trpc-prefetch";
import Link from "next/link";
import { CountdownNavDropdown } from "./countdown-nav-dropdown";

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

        <nav className="ml-auto flex items-center gap-1">
          <div className="hidden sm:flex">
            <CountdownNavDropdown />
          </div>
          <TRPCPrefetch
            isSuspense={true}
            suspenseFallback={<Skeleton className="h-8 w-8 rounded-full" />}
            errorFallback={
              <Skeleton className="h-8 w-8 rounded-full bg-red-500" />
            }
            queryOptionsToPrefetch={[
              trpc.user.getUserButtonData.queryOptions(),
            ]}
          >
            <UserButton />
          </TRPCPrefetch>
        </nav>
      </div>
    </header>
  );
};
