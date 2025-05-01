import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";

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
      <html lang="en" suppressHydrationWarning>
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
