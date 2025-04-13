"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { UserButton } from "~/components/user-button";
import { CalendarDays, GraduationCap, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Navbar() {
  const pathname = usePathname();

  const isTeacherSection = !pathname.startsWith("/student");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span>SchoolDaysLeft.com</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <div className="hidden gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {isTeacherSection ? (
                    <>
                      <School className="h-4 w-4" />
                      <span>Teacher</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-4 w-4" />
                      <span>Student</span>
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/countdown">Teacher Countdown</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/student/countdown">Student Countdown</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ModeToggle />
          <UserButton />
        </nav>
      </div>
    </header>
  );
}
