import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
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
    </div>
  );
}
