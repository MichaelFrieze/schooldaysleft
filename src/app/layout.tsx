import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { Navbar } from "~/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Days Left",
  description:
    "Track the remaining school days with customizable start dates, end dates, and days off. Perfect for students, parents, and teachers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
