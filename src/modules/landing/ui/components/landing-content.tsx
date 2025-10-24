import { SignedIn, SignedOut } from '@clerk/tanstack-react-start'
import {
  Calendar,
  CalendarDays,
  LayoutGrid,
  PieChart,
  SlidersHorizontal,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export function LandingContent() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="py-8 lg:py-24">
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="mx-auto flex max-w-xs flex-col justify-center sm:max-w-xl">
            <h1 className="text-left text-4xl leading-tight font-bold tracking-tighter sm:text-center sm:text-6xl">
              <span className="text-primary bg-clip-text">Countdown</span> the
            </h1>
            <h1 className="mb-6 text-left text-4xl leading-tight font-bold tracking-tighter sm:text-center sm:text-6xl">
              School Days Left
            </h1>

            <p className="text-muted-foreground mb-8 text-lg sm:text-center">
              Create custom countdowns for important dates like summer break,
              winter break, end of semester, or any other dates that matter most
              to you.
            </p>

            <SignedIn>
              <Link
                to="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'gap-2 sm:mx-auto sm:w-sm',
                )}
              >
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in/$"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'gap-2 sm:mx-auto sm:w-sm',
                )}
              >
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-1 gap-12 lg:grid lg:grid-cols-2">
          <div className="flex max-w-lg flex-col justify-center">
            <h1 className="mb-6 text-6xl leading-tight font-bold tracking-tighter">
              <span className="text-primary bg-clip-text">Countdown</span> the
              School Days Left
            </h1>

            <p className="text-muted-foreground mb-8 max-w-xl text-lg">
              Create custom countdowns for important dates like summer break,
              winter break, end of semester, or any other dates that matter most
              to you.
            </p>

            <SignedIn>
              <Link
                to="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'min-w-[240px] gap-2',
                )}
              >
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in/$"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'min-w-[240px] gap-2',
                )}
              >
                <CalendarDays className="h-5 w-5" />
                Start Your Countdown
              </Link>
            </SignedOut>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="pb-8">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Friday, May 23, 2025
                  </span>
                </div>
              </div>

              <div className="text-center">
                <div className="from-primary via-primary/80 to-primary bg-linear-to-r bg-clip-text text-8xl font-extrabold text-transparent tabular-nums">
                  15
                </div>
                <p className="text-muted-foreground pt-2 text-xl font-medium">
                  days left!
                </p>
              </div>

              <div className="pt-8">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    Progress
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    92%
                  </span>
                </div>
                <Progress value={92} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 lg:py-24">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-full lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-4">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                <LayoutGrid className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Multiple Countdowns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Teachers, students, and parents can create and manage as many
                countdowns as they need.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                <SlidersHorizontal className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily set your start and end date, mark weekly days off, and
                add additional holidays and breaks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                <PieChart className="text-primary h-8 w-8" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track days completed and days remaining with a visual countdown
                and progress bar.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
