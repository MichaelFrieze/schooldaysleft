import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { caller, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { LatestPost } from "./_components/posts";
import { Suspense } from "react";

export default async function Home() {
  const hello = await caller.post.hello({ text: "from tRPC" });

  prefetch(trpc.post.getLatest.queryOptions());

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
      <HydrateClient>
        <Suspense fallback={<p>Loading from RSC...</p>}>
          <LatestPost />
        </Suspense>
      </HydrateClient>
    </div>
  );
}
