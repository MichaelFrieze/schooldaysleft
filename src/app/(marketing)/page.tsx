import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

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
    </div>
  );
}
