import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/modules/auth/ui/layouts/auth-layout'

export const Route = createFileRoute('/(auth)')({
  ssr: false,
  component: AuthLayoutRoute,
})

function AuthLayoutRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
