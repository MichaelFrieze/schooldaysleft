import { Button } from "@/components/ui/button";
import { caller, trpc } from "@/trpc/server";
import { TRPCPrefetch } from "@/trpc/trpc-prefetch";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LatestPost } from "./_components/posts";

export default async function Home() {
  const hello = await caller.post.hello({ text: "from tRPC" });
  const getLatestPostQueryOptions = trpc.post.getLatest.queryOptions();

  return (
    <div>
      <h1>Home</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button variant={"outline"} asChild>
          <SignInButton mode="modal">Sign In</SignInButton>
        </Button>
      </SignedOut>
      <p>{hello.greeting}</p>

      <TRPCPrefetch
        queryOptionsToPrefetch={[getLatestPostQueryOptions]}
        suspenseFallback={<p>Loading from RSC...</p>}
        errorFallback={<p>Error from RSC...</p>}
        isSuspense={true}
      >
        <LatestPost />
      </TRPCPrefetch>
    </div>
  );
}
