import { createFileRoute } from '@tanstack/react-router'
import { convexQuery } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { DashboardView } from '@/modules/dashboard/ui/views/dashboard-view'

export const Route = createFileRoute('/(countdown)/dashboard/')({
  head: () => ({
    meta: [
      {
        title: 'Dashboard | SchoolDaysLeft',
      },
    ],
  }),
  loader: (opts) => {
    opts.context.queryClient.prefetchQuery(
      convexQuery(api.countdowns.getAll, {}),
    )
  },
  component: DashboardRoute,
})

function DashboardRoute() {
  return <DashboardView />
}
