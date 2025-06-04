/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydrateClient, prefetch } from "@/trpc/server";
import { type TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { unstable_noStore } from "next/cache";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type TRPCPrefetchProps =
  | {
      isSuspense: true;
      suspenseFallback?: ReactNode | null;
      errorFallback?: ReactNode | null;
      queryOptionsToPrefetch: ReturnType<TRPCQueryOptions<any>>[];
      children: ReactNode;
    }
  | {
      isSuspense?: false;
      suspenseFallback?: null;
      errorFallback?: null;
      queryOptionsToPrefetch: ReturnType<TRPCQueryOptions<any>>[];
      children: ReactNode;
    };

// Only use this to wrap a single client component
export function TRPCPrefetch({
  isSuspense = false,
  suspenseFallback = null,
  errorFallback = null,
  queryOptionsToPrefetch,
  children,
}: TRPCPrefetchProps) {
  if (!isSuspense) {
    return (
      <PrefetchAndHydrate queryOptionsToPrefetch={queryOptionsToPrefetch}>
        {children}
      </PrefetchAndHydrate>
    );
  }

  return (
    <ErrorBoundary fallback={<>{errorFallback}</>}>
      <Suspense fallback={<>{suspenseFallback}</>}>
        <PrefetchAndHydrate queryOptionsToPrefetch={queryOptionsToPrefetch}>
          {children}
        </PrefetchAndHydrate>
      </Suspense>
    </ErrorBoundary>
  );
}

type PrefetchAndHydrateProps = {
  queryOptionsToPrefetch: ReturnType<TRPCQueryOptions<any>>[];
  children: ReactNode;
};

function PrefetchAndHydrate({
  queryOptionsToPrefetch,
  children,
}: PrefetchAndHydrateProps) {
  unstable_noStore(); // opt out of pre-rendering
  queryOptionsToPrefetch.map((p) => {
    prefetch(p);
  });
  return <HydrateClient>{children}</HydrateClient>;
}

// This was inspired by a custom Await component created by Ravi: https://gist.github.com/perfectbase/ff9448774a8bb3608170d968faadc627

// The <MaybeErrorBoundary fallback={<>{errorComponent}</>}> is pretty cool, but not needed in my TRPCPrefetch component:
// const MaybeErrorBoundary = errorComponent ? ErrorBoundary : Fragment;
