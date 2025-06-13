"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from "@/modules/user/ui/components/user-profile";
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
import { Suspense, useState } from "react";
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
  const { signOut } = useClerk();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const trpc = useTRPC();

  const { data: userButtonData } = useSuspenseQuery({
    ...trpc.user.getUserButtonData.queryOptions(),
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });

  const { userFullName, userEmail, userImage } = userButtonData;

  const handleOpenUserProfile = () => {
    setIsProfileDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImage} alt={"User Avatar"} />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {userFullName ? (
                <p className="text-sm leading-none font-medium">
                  {userFullName}
                </p>
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
          <DropdownMenuItem onClick={handleOpenUserProfile}>
            <UserCircleIcon />
            <span>Account</span>
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

      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="w-[calc(100vw-4rem)] max-w-[55rem] rounded-lg border-0 p-0 sm:w-[calc(100vw-4rem)] sm:max-w-[55rem]">
          <DialogHeader className="sr-only">
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <UserProfile />
        </DialogContent>
      </Dialog>
    </>
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
