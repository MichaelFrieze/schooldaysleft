import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, LogIn } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-6">
          <div className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums md:text-9xl">
            404
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Page Not Found
            </h1>

            <p className="text-muted-foreground mx-auto max-w-lg text-lg">
              Looks like this page took an unexpected break! The page
              you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>
        </div>

        <div className="pb-2">
          <h2 className="pb-2 text-lg font-semibold">
            New to School Days Left?
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="default" className="gap-2">
              <Link href={"/"}>
                <Home className="h-5 w-5" />
                Home
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/sign-in">
                <LogIn className="h-5 w-5" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-border/40 bg-background overflow-hidden rounded-xl border shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              Already signed-in?
            </CardTitle>
            <CardDescription className="text-center">
              Here are some pages you might be interested in:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <>
                <Link
                  href="/dashboard"
                  className="hover:bg-accent hover:text-accent-foreground hover:border-border rounded-lg border border-transparent p-4 text-left transition-colors"
                >
                  <div className="font-medium">Dashboard</div>
                  <div className="text-muted-foreground text-sm">
                    View your countdowns
                  </div>
                </Link>

                <Link
                  href="/countdown/new"
                  className="hover:bg-accent hover:text-accent-foreground hover:border-border rounded-lg border border-transparent p-4 text-left transition-colors"
                >
                  <div className="font-medium">Create Countdown</div>
                  <div className="text-muted-foreground text-sm">
                    Start a new countdown
                  </div>
                </Link>

                <Link
                  href="/account"
                  className="hover:bg-accent hover:text-accent-foreground hover:border-border rounded-lg border border-transparent p-4 text-left transition-colors"
                >
                  <div className="font-medium">Account</div>
                  <div className="text-muted-foreground text-sm">
                    Manage your profile
                  </div>
                </Link>

                <Link
                  href="/settings"
                  className="hover:bg-accent hover:text-accent-foreground hover:border-border rounded-lg border border-transparent p-4 text-left transition-colors"
                >
                  <div className="font-medium">Settings</div>
                  <div className="text-muted-foreground text-sm">
                    Customize your experience
                  </div>
                </Link>
              </>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
