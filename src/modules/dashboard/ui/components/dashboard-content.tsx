import { convexQuery } from '@convex-dev/react-query'
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { AlertTriangle, CalendarDays, Plus, UserCircleIcon } from 'lucide-react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from '@tanstack/react-router'
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import { DashboardCountdownCard } from './dashboard-countdown-card'
import type { FallbackProps } from 'react-error-boundary'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function DashboardContent() {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <>
      <Authenticated>
        <ErrorBoundary FallbackComponent={DashboardError} onReset={reset}>
          <Suspense fallback={<DashboardContentLoading />}>
            <DashboardContentSuspense />
          </Suspense>
        </ErrorBoundary>
      </Authenticated>
      <AuthLoading>
        <DashboardContentLoading />
      </AuthLoading>
      <Unauthenticated>
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">You&apos;re not signed in.</h3>
          <p className="text-muted-foreground max-w-sm pb-4 text-sm">
            Please sign in to access your dashboard.
          </p>
          <Link
            to="/sign-in/$"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'rounded-full',
            )}
          >
            <UserCircleIcon />
            Sign in
          </Link>
        </div>
      </Unauthenticated>
    </>
  )
}

export function DashboardContentSuspense() {
  const { data: countdowns } = useSuspenseQuery(
    convexQuery(api.countdowns.getAll, {}),
  )

  if (countdowns.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <CalendarDays className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-medium">No Countdowns Yet</h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Create your first countdown to track the days left until your next
          break or the end of the school year.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/countdown/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Countdown
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countdowns.map((countdown) => {
        return (
          <DashboardCountdownCard key={countdown._id} countdown={countdown} />
        )
      })}
    </div>
  )
}

function DashboardCountdownCardSkeleton() {
  return (
    <Card className="relative p-6">
      <Skeleton className="absolute top-4 right-4 h-4 w-4 rounded-md" />
      <div className="space-y-6">
        <div>
          <Skeleton className="h-7 w-3/4 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="mx-auto h-11 w-16 rounded-md" />
          <Skeleton className="mx-auto h-6 w-20 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </div>
    </Card>
  )
}

function DashboardContentLoading() {
  return (
    <div className="grid animate-[delayed-fade-in_.5s_ease-out] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DashboardCountdownCardSkeleton />
      <DashboardCountdownCardSkeleton />
      <DashboardCountdownCardSkeleton />
    </div>
  )
}

function DashboardError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
      role="alert"
    >
      <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-medium">Something went wrong</h3>
      <p className="text-muted-foreground max-w-sm text-sm">
        There was an issue loading your dashboard. Please try again.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" className="mt-6">
        Try Again
      </Button>
    </div>
  )
}
