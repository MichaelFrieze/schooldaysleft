"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { ModeToggle } from "@/components/mode-toggle";
// import { TeacherStudentDropdown } from "@/components/teacher-student-dropdown";

export const MarketingNavbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CalendarDays className="text-primary h-5 w-5" />
          <span>SchoolDaysLeft</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <div className="hidden gap-2 md:flex">
            {/* <TeacherStudentDropdown /> */}
          </div>
          <ModeToggle />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
