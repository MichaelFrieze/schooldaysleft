"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface CountdownHeaderSectionProps {
  countdownId: string;
}

export const CountdownHeaderSection = ({
  countdownId,
}: CountdownHeaderSectionProps) => {
  return (
    <Suspense>
      <CountdownHeaderSectionSuspense countdownId={countdownId} />
    </Suspense>
  );
};

const CountdownHeaderSectionSuspense = ({
  countdownId,
}: CountdownHeaderSectionProps) => {
  const trpc = useTRPC();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
    retry: false,
  });

  return (
    <section className="py-8 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {countdown.name}
          </h1>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href={`/countdown/${countdown.id}/edit`}>
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>
    </section>
  );
};

// const CountdownHeaderSectionLoading = () => {
//   return (
//     <section className="py-8 md:py-12">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div className="space-y-2">
//           <Skeleton className="h-9 w-full rounded-md md:w-lg" />
//         </div>
//         <Skeleton className="h-8 w-full rounded-md md:w-18" />
//       </div>
//     </section>
//   );
// };
