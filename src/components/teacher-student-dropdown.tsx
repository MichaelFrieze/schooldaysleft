"use client";

import { usePathname } from "next/navigation";
import { GraduationCap, School } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";

export function TeacherStudentDropdown() {
  const pathname = usePathname();
  const isTeacherSection = !pathname?.startsWith("/student");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 gap-2">
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
  );
}
