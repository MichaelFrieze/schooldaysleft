import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClerkUserButton } from "@/modules/auth/ui/components/clerk-user-button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const MarketingNavItems = async () => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button
          variant="default"
          className="h-8 rounded-full text-sm font-medium shadow-none"
        >
          <UserCircleIcon />
          Sign in
        </Button>
      </SignInButton>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="ghost" size={"sm"} className="hidden lg:flex">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <div className="h-8 w-8">
        <ClerkUserButton />
      </div>
    </div>
  );
};
