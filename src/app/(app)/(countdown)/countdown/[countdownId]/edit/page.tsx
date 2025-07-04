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
      queryOptionsToPrefetch={[
        trpc.countdown.getById.queryOptions({
          id: countdownId,
        }),
      ]}
    >
      <EditCountdownView countdownId={countdownId} />
    </TRPCPrefetch>
  );
};

export default Page;
