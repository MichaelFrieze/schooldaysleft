import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import Link from "next/link";

export const MarketingNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
              School
            </span>
            DaysLeft
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
