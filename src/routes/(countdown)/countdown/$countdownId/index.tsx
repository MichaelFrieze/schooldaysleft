import { createFileRoute } from '@tanstack/react-router'
import { convexQuery } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { CountdownView } from '@/modules/countdown/ui/views/countdown-view'

export const Route = createFileRoute('/(countdown)/countdown/$countdownId/')({
  head: () => ({
    meta: [
      {
        title: 'Countdown | SchoolDaysLeft',
      },
    ],
  }),
  loader: ({ context, params }) => {
    if (context.isAuthenticated) {
      context.queryClient.prefetchQuery(
        convexQuery(api.countdowns.getById, {
          id: params.countdownId as Id<'countdowns'>,
        }),
      )
    }
  },
  component: CountdownRoute,
})

function CountdownRoute() {
  const { countdownId } = Route.useParams()

  return <CountdownView countdownId={countdownId} />
}
