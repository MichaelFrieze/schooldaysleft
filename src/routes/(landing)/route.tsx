import { Outlet, createFileRoute } from '@tanstack/react-router'
import { LandingLayout } from '@/modules/landing/ui/layouts/landing-layout'

export const Route = createFileRoute('/(landing)')({
  component: LandingLayoutRoute,
})

function LandingLayoutRoute() {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  )
}
