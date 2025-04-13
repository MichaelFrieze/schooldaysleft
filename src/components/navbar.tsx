"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { UserButton } from "~/components/user-button";
import { TeacherStudentDropdown } from "~/components/teacher-student-dropdown";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>SchoolDaysLeft</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <div className="hidden gap-2 md:flex">
            <TeacherStudentDropdown />
          </div>
          <ModeToggle />
          <UserButton />
        </nav>
      </div>
    </header>
  );
}
