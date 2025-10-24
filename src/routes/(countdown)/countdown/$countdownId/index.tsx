import { createFileRoute } from '@tanstack/react-router'
import { CountdownView } from '@/modules/countdown/ui/views/countdown-view'

export const Route = createFileRoute('/(countdown)/countdown/$countdownId/')({
  head: () => ({
    meta: [
      {
        title: 'Countdown | SchoolDaysLeft',
      },
    ],
  }),
  // loader: (opts) => {
  //   opts.context.queryClient.prefetchQuery(
  //     convexQuery(api.countdowns.getById, {
  //       id: opts.params.countdownId as Id<'countdowns'>,
  //     }),
  //   )
  // },
  ssr: false,
  component: CountdownRoute,
})

function CountdownRoute() {
  const { countdownId } = Route.useParams()

  return <CountdownView countdownId={countdownId} />
}
