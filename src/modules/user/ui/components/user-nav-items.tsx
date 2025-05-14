import { Button } from "@/components/ui/button";
import { ClerkUserButton } from "@/modules/auth/ui/components/clerk-user-button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const UserNavItems = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="ghost" className="hidden lg:flex">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <div className="h-8 w-8">
        <ClerkUserButton />
      </div>
    </div>
  );
};
