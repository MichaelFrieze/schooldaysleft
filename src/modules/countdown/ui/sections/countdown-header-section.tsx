"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CountdownHeaderSectionProps {
  countdownId: string;
}

export const CountdownHeaderSection = ({
  countdownId,
}: CountdownHeaderSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Error...</p>}>
      <Suspense fallback={<CountdownHeaderSectionSkeleton />}>
        <CountdownHeaderSectionSuspense countdownId={countdownId} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CountdownHeaderSectionSkeleton = () => {
  return <div className="py-8 md:py-12">loading...</div>;
};

const CountdownHeaderSectionSuspense = ({
  countdownId,
}: CountdownHeaderSectionProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: countdown } = useSuspenseQuery({
    ...trpc.countdown.getById.queryOptions({
      id: parseInt(countdownId),
    }),
  });

  const deleteCountdownMutation = useMutation({
    ...trpc.countdown.delete.mutationOptions(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: trpc.countdown.getAll.queryKey(),
      });

      void router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Failed to delete countdown:", error);
      // Maybe add toast notification here if you have a toast system
    },
  });

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete "${countdown.name}"? This action cannot be undone.`,
      )
    ) {
      deleteCountdownMutation.mutate({
        id: countdown.id,
      });
    }
  };

  return (
    <section className="py-8 md:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {countdown.name}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/countdown/${countdown.id}/edit`}>
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={deleteCountdownMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
            {deleteCountdownMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </section>
  );
};
