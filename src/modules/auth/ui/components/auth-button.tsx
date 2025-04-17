"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export const AuthButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoaded } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <>
      <SignedIn>
        <div className="h-8 w-8">
          <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-blue-500/20 px-3 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
