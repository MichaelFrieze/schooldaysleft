import { SignInButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { MarketingUserButton } from "./marketing-user-button";

export const MarketingNavItems = async () => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button
          variant="default"
          className="h-9 rounded-full text-sm font-medium shadow-none"
        >
          <UserCircleIcon />
          Sign in
        </Button>
      </SignInButton>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="ghost" size={"sm"}>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <div className="h-9 w-9">
        <MarketingUserButton />
      </div>
    </div>
  );
};
