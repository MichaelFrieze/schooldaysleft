"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
    <div className="h-8 w-8">
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: "2rem",
                width: "2rem",
              },
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="default"
            className="h-8 rounded-full text-sm font-medium shadow-none"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};
