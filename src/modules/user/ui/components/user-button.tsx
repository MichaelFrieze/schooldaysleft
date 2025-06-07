"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/react";
import { useClerk } from "@clerk/nextjs";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Home,
  LayoutDashboard,
  LogOut,
  Settings2,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export const UserButton = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={UserButtonError} onReset={reset}>
      <Suspense fallback={<UserButtonLoading />}>
        <UserButtonSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export function UserButtonSuspense() {
  const trpc = useTRPC();
  const { signOut } = useClerk();

  const { data: userButtonData } = useSuspenseQuery({
    ...trpc.user.getUserButtonData.queryOptions(),
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });

  const { userFullName, userEmail, userImage } = userButtonData;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={"User Avatar"} />
            <AvatarFallback>
              <Skeleton className="h-8 w-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {userFullName ? (
              <p className="text-sm leading-none font-medium">{userFullName}</p>
            ) : null}
            {userEmail ? (
              <p className="text-muted-foreground text-xs leading-none">
                {userEmail}
              </p>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings2 />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserCircleIcon />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/home">
            <Home />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          onClick={async () => {
            await signOut();
          }}
        >
          <div>
            <LogOut />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UserButtonLoading = () => {
  return (
    <div className="[animation:delayed-fade-in_.5s_ease-out]">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
};

const UserButtonError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Skeleton
      onClick={resetErrorBoundary}
      className="bg-destructive h-8 w-8 cursor-pointer rounded-full"
    />
  );
};
