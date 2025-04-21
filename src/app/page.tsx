import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignedIn>
        <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">Sign In</SignInButton>
      </SignedOut>
    </div>
  );
}
