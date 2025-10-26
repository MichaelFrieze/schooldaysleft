import { createFileRoute } from '@tanstack/react-router'
import { NewCountdownView } from '@/modules/new-countdown/ui/views/new-countdown-view'

export const Route = createFileRoute('/(countdown)/countdown/new/')({
  head: () => ({
    meta: [
      {
        title: 'Create Countdown | SchoolDaysLeft',
      },
    ],
  }),
  component: NewCountdownRoute,
})

function NewCountdownRoute() {
  return <NewCountdownView />
}
