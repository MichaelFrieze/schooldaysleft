import { CountdownView } from "@/modules/countdown/ui/views/countdown-view";
import { trpc } from "@/trpc/server";
import { TRPCPrefetch } from "@/trpc/trpc-prefetch";

interface PageProps {
  params: Promise<{ countdownId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { countdownId } = await params;

  return (
    // <TRPCPrefetch
    //   queryOptionsToPrefetch={[
    //     trpc.countdown.getById.queryOptions({
    //       id: countdownId,
    //     }),
    //   ]}
    // >
    //   <CountdownView countdownId={countdownId} />
    // </TRPCPrefetch>

    <CountdownView countdownId={countdownId} />
  );
};

export default Page;
