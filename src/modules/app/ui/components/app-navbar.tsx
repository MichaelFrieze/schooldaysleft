"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { CalendarDays, ChevronDown, LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppNavbar = () => {
  const pathname = usePathname();

  // Temporary mock data until connected to DB
  const countdowns = [
    { id: "1", name: "Summer Break 2024" },
    { id: "2", name: "Spring Break" },
    { id: "3", name: "Winter Break" },
  ];

  // Get current page name based on pathname
  const getCurrentPageName = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/countdown/new") return "New Countdown";

    const countdownId = pathname.split("/").pop();
    const currentCountdown = countdowns.find((c) => c.id === countdownId);
    return currentCountdown?.name ?? "Select Countdown";
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard">
          <CalendarDays className="text-primary h-8 w-8" />
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {getCurrentPageName()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {countdowns.map((countdown) => (
                <DropdownMenuItem key={countdown.id} asChild>
                  <Link href={`/countdown/${countdown.id}`}>
                    {countdown.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/countdown/new" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Countdown
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};

// import { AuthButton } from "@/modules/auth/ui/components/auth-button";
// import { CalendarDays } from "lucide-react";
// import Link from "next/link";

// export const AppNavbar = () => {
//   return (
//     <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
//       <div className="container flex h-16 items-center">
//         <Link href="/dashboard">
//           <CalendarDays className="text-primary h-8 w-8" />
//         </Link>

//         <nav className="ml-auto flex items-center gap-4">
//           <AuthButton />
//         </nav>
//       </div>
//     </header>
//   );
// };

// import { AuthButton } from "@/modules/auth/ui/components/auth-button";
// import { CalendarDays } from "lucide-react";
// import Link from "next/link";

// export const AppNavbar = () => {
//   return (
//     <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
//       <div className="container flex h-16 items-center">
//         <Link
//           href="/dashboard"
//           className="hover:text-primary flex items-center gap-2 transition-colors"
//         >
//           <CalendarDays className="text-primary h-8 w-8" />
//           <span className="hidden text-lg font-semibold sm:inline">
//             TeacherTimer
//           </span>
//         </Link>

//         <nav className="flex flex-1 items-center justify-end gap-6">
//           <Link
//             href="/dashboard"
//             className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/countdown/new"
//             className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
//           >
//             New Countdown
//           </Link>
//           <AuthButton />
//         </nav>
//       </div>
//     </header>
//   );
// };

// import { AuthButton } from "@/modules/auth/ui/components/auth-button";
// import { CalendarDays } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// export const AppNavbar = () => {
//   return (
//     <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/dashboard" className="group flex items-center gap-2">
//           <CalendarDays className="text-primary h-7 w-7 transition-transform group-hover:scale-110" />
//           <span className="hidden text-lg font-bold sm:inline-block">
//             SchooldaysLeft
//           </span>
//         </Link>

//         <nav className="flex items-center gap-4">
//           <AuthButton />
//         </nav>
//       </div>
//     </header>
//   );
// };
