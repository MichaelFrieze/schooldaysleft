import { createFileRoute } from '@tanstack/react-router'
import { DashboardView } from '@/modules/dashboard/ui/views/dashboard-view'

export const Route = createFileRoute('/(countdown)/dashboard/')({
  head: () => ({
    meta: [
      {
        title: 'Dashboard | SchoolDaysLeft',
      },
    ],
  }),
  component: DashboardRoute,
})

function DashboardRoute() {
  return <DashboardView />
}
