import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { AlertTriangle, UserCircleIcon } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import { Link } from '@tanstack/react-router'
import {
  CountdownDetailsSection,
  CountdownDetailsSectionLoading,
} from '../sections/countdown-details-section'
import {
  CountdownHeaderSection,
  CountdownHeaderSectionLoading,
} from '../sections/countdown-header-section'
import {
  CountdownMainSection,
  CountdownMainSectionLoading,
} from '../sections/countdown-main-section'
import type { FallbackProps } from 'react-error-boundary'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CountdownViewProps {
  countdownId: string
}

export function CountdownView({ countdownId }: CountdownViewProps) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <div className="container">
      <Authenticated>
        <ErrorBoundary FallbackComponent={CountdownError} onReset={reset}>
          <CountdownHeaderSection countdownId={countdownId} />
          <CountdownMainSection countdownId={countdownId} />
          <CountdownDetailsSection countdownId={countdownId} />
        </ErrorBoundary>
      </Authenticated>

      <AuthLoading>
        <CountdownHeaderSectionLoading />
        <CountdownMainSectionLoading />
        <CountdownDetailsSectionLoading />
      </AuthLoading>

      <Unauthenticated>
        <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">You&apos;re not signed in.</h3>
          <p className="text-muted-foreground max-w-sm pb-4 text-sm">
            Please sign in to access your countdown.
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
    </div>
  )
}

function CountdownError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="mt-8 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
      role="alert"
    >
      <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-medium">Something went wrong</h3>
      <p className="text-muted-foreground max-w-sm text-sm">
        There was an issue loading your countdown.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" className="mt-6">
        Try Again
      </Button>
    </div>
  )
}
