import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { caller, trpc } from "@/trpc/server";
import { Await } from "@/trpc/await";
import { LatestPost } from "./_components/posts";

export default async function Home() {
  const hello = await caller.post.hello({ text: "from tRPC" });

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
      <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
      <Await
        prefetch={[trpc.post.getLatest.queryOptions()]}
        fallback={<p>Loading...</p>}
        errorComponent={<p>Error</p>}
      >
        <LatestPost />
      </Await>
    </div>
  );
}
