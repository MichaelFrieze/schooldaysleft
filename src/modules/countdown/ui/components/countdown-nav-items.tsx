import { ClerkUserButton } from "@/modules/auth/ui/components/clerk-user-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CountdownNavDropdown } from "./countdown-nav-dropdown";

export const CountdownNavItems = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex">
        <CountdownNavDropdown />
      </div>
      <div className="h-8 w-8">
        <ClerkUserButton />
      </div>
    </div>
  );
};
