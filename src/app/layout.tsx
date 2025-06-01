import { NextThemeProvider } from "@/components/next-theme-provider";
import { fontVariables } from "@/lib/root-layout-fonts";
import { type Metadata } from "next";

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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}
