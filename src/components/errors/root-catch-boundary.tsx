import { Link, useRouter } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import { Card } from '../ui/card'
import type { ErrorComponentProps } from '@tanstack/react-router'
import type { AppError } from '@/lib/app-error'
import { isAppError } from '@/lib/app-error'

export function RootCatchBoundary({
  error,
  reset,
}: Omit<ErrorComponentProps, 'error'> & { error: Error | AppError }) {
  const router = useRouter()
  console.log('error', error)

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <Card className="max-w-3xl p-6">
        <h1 className="text-3xl font-extrabold">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred on SchoolDaysLeft. You can go home, try
          again, or reload the page. You can also contact support by clicking
          the button below.
        </p>

        {isAppError(error) ? (
          <div className="bg-muted rounded border p-4">
            <div className="grid grid-cols-1 gap-3 pt-3 text-sm sm:grid-cols-3">
              <div>
                <div className="text-muted-foreground text-xs">Type</div>
                <div className="font-medium">{String(error.name)}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Error code</div>
                <div className="font-medium break-all">
                  {String(error.appErrorCode)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">HTTP Code</div>
                <div className="font-medium break-all">
                  {String(error.httpStatusCode)}
                </div>
              </div>
            </div>

            <div className="text-muted-foreground pt-3 text-xs">
              If this keeps happening, please contact support and include the
              error code above.
            </div>
          </div>
        ) : typeof error === 'object' ? (
          (() => {
            const e = error as unknown as Record<string, unknown>
            const hasServerCode =
              e.appErrorCode != null || e.httpStatusCode != null
            if (!hasServerCode) {
              return (
                <div className="bg-muted rounded border p-4">
                  <div>
                    <div className="text-muted-foreground text-xs">Type</div>
                    <div className="font-medium break-all">
                      {String(e.name ?? 'Error')}
                    </div>
                  </div>
                  {e.message ? (
                    <div className="pt-3 text-sm">{String(e.message)}</div>
                  ) : null}
                </div>
              )
            }
            return (
              <div className="bg-muted rounded border p-4">
                {/* Collapse to a single column on small screens */}
                <div className="grid grid-cols-1 gap-3 pt-3 text-sm sm:grid-cols-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Type</div>
                    <div className="font-medium">
                      {String(e.name ?? 'Error')}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Error code
                    </div>
                    <div className="font-medium break-all">
                      {String(e.appErrorCode ?? '—')}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">
                      HTTP Code
                    </div>
                    <div className="font-medium break-all">
                      {String(e.httpStatusCode ?? '—')}
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground pt-3 text-xs">
                  If this keeps happening, please contact support and include
                  the error code above.
                </div>
              </div>
            )
          })()
        ) : (
          <div className="bg-muted rounded border p-3 text-sm">
            {String(error)}
          </div>
        )}

        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Link to="/" className={buttonVariants({ variant: 'default' })}>
              Go Home
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                reset()
                router.invalidate()
              }}
              className="cursor-pointer"
            >
              Try Again
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="mailto:contact@schooldaysleft.com"
              target="_blank"
              aria-label="Contact us"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'default',
                size: 'default',
                className: 'text-muted-foreground',
              })}
            >
              <Mail /> Contact Support
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
