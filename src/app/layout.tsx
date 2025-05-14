import { UserThemeProvider } from "@/modules/user/ui/components/user-theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { fontVariables } from "@/lib/root-layout-fonts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "School Days Left",
  description:
    "Track the remaining school days with customizable start dates, end dates, and days off. Perfect for students, parents, and teachers.",
  icons: [
    {
      rel: "icon",
      url: "/images/calendar-days-favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "icon",
      url: "/images/calendar-days-favicon.png",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" className={fontVariables} suppressHydrationWarning>
        <body>
          <TRPCReactProvider>
            <UserThemeProvider>{children}</UserThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
