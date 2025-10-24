import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { AlertTriangle, ChevronDown, LayoutDashboard, Plus } from 'lucide-react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { countdownsQueryOptions } from '../../lib/countdowns-query-options'
import type { FallbackProps } from 'react-error-boundary'
import { cn } from '@/lib/utils'
import useStableLocation from '@/hooks/use-stable-location'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function CountdownNavDropdown() {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      FallbackComponent={CountdownNavDropdownError}
      onReset={reset}
    >
      <Suspense fallback={<CountdownNavDropdownLoading />}>
        <CountdownNavDropdownSuspense />
      </Suspense>
    </ErrorBoundary>
  )
}

export function CountdownNavDropdownSuspense() {
  // const pathname = useLocation({
  // 	select: (location) => location.pathname,
  // });

  const pathname = useStableLocation()

  const { data: countdowns } = useSuspenseQuery(countdownsQueryOptions())

  const getCurrentPageName = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/countdown/new') return 'New Countdown'

    if (pathname.endsWith('/edit')) {
      const countdownId = pathname.split('/')[2]
      const currentCountdown = countdowns.find((c) => c._id === countdownId)
      return currentCountdown?.name
    }

    const countdownId = pathname.split('/').pop()
    const currentCountdown = countdowns.find((c) => c._id === countdownId)

    return currentCountdown?.name
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="max-w-64 min-w-0 gap-2 focus-visible:ring-1"
        >
          <span className="min-w-0 flex-1 truncate">
            {getCurrentPageName()}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-45">
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard"
            className={cn(
              pathname === '/dashboard' && 'bg-accent text-accent-foreground',
            )}
          >
            <LayoutDashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {countdowns?.map((countdown) => (
          <DropdownMenuItem key={countdown._id} asChild>
            <Link
              to="/countdown/$countdownId"
              params={{
                countdownId: countdown._id,
              }}
              className={cn(
                pathname === `/countdown/${countdown._id}` &&
                  'bg-accent text-accent-foreground',
              )}
            >
              {countdown.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to="/countdown/new"
            className={cn(
              pathname === '/countdown/new' &&
                'bg-accent text-accent-foreground',
            )}
          >
            <Plus />
            New Countdown
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CountdownNavDropdownLoading() {
  return (
    <Button
      variant="ghost"
      className="max-w-64 min-w-0 [animation:delayed-fade-in_.5s_ease-out] gap-2 focus-visible:ring-1"
    >
      <Skeleton className="h-5 w-32" />
      <ChevronDown className="h-4 w-4 shrink-0" />
    </Button>
  )
}

function CountdownNavDropdownError({ resetErrorBoundary }: FallbackProps) {
  return (
    <Button variant="ghost" onClick={resetErrorBoundary} className="gap-2">
      <AlertTriangle className="text-destructive h-4 w-4 shrink-0" />
      <span className="text-destructive truncate">Error</span>
    </Button>
  )
}
