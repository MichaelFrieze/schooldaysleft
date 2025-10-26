import { Outlet, createFileRoute } from '@tanstack/react-router'
import { countdownsQueryOptions } from '@/modules/countdown/lib/countdowns-query-options'
import { CountdownLayout } from '@/modules/countdown/ui/layouts/countdown-layout'

export const Route = createFileRoute('/(countdown)')({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(countdownsQueryOptions())
  },
  component: CountdownLayoutRoute,
})

function CountdownLayoutRoute() {
  return (
    <CountdownLayout>
      <Outlet />
    </CountdownLayout>
  )
}
