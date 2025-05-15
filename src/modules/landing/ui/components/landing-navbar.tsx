import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <header>
      <div className="container flex h-16 items-center">
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </Link>

        <nav className="ml-auto">
          <Button
            asChild
            variant="default"
            className="h-8 rounded-full text-sm font-medium shadow-none"
          >
            <Link href="/sign-in">
              <UserCircleIcon />
              Sign in
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
