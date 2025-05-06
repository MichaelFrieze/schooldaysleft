import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppNavDropdown } from "./app-nav-dropdown";
import { AppUserButton } from "./app-user-button";

export const AppNavItems = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex items-center gap-1">
      <div className="hidden sm:flex">
        <AppNavDropdown />
      </div>
      <div className="h-8 w-8">
        <AppUserButton />
      </div>
    </div>
  );
};
