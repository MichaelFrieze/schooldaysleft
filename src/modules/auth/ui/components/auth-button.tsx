"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthButton = () => {
  return (
    <div className="h-8 w-8">
      <ClerkLoading>
        <Skeleton className="h-8 w-8 rounded-full" />
      </ClerkLoading>
      <ClerkLoaded>
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
      </ClerkLoaded>
    </div>
  );
};
