import { EditCountdownView } from "@/modules/edit-countdown/ui/views/edit-countdown-view";
import { trpc } from "@/trpc/server";
import { TRPCPrefetch } from "@/trpc/trpc-prefetch";

interface PageProps {
  params: Promise<{ countdownId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { countdownId } = await params;

  return (
    <TRPCPrefetch
      isSuspense={true}
      // suspenseFallback={
      //   <p className="container pt-8 text-center md:pt-12">Loading...</p>
      // }
      errorFallback={
        <p className="container pt-8 text-center md:pt-12">Error...</p>
      }
      queryOptionsToPrefetch={[
        trpc.countdown.getById.queryOptions({
          id: parseInt(countdownId),
        }),
      ]}
    >
      <EditCountdownView />
    </TRPCPrefetch>
  );
};

export default Page;
