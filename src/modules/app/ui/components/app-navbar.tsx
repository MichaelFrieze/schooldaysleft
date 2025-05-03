import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export const AppNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <CalendarDays className="text-primary h-8 w-8" />
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
