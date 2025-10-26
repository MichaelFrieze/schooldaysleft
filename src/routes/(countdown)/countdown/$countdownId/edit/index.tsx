import { createFileRoute } from '@tanstack/react-router'
import { EditCountdownView } from '@/modules/edit-countdown/ui/views/edit-countdown-view'

export const Route = createFileRoute(
  '/(countdown)/countdown/$countdownId/edit/',
)({
  head: () => ({
    meta: [
      {
        title: 'Edit Countdown | SchoolDaysLeft',
      },
    ],
  }),
  component: EditCountdownRoute,
})

function EditCountdownRoute() {
  const { countdownId } = Route.useParams()

  return <EditCountdownView countdownId={countdownId} />
}
