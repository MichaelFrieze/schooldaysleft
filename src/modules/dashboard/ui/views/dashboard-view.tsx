import { Plus } from 'lucide-react'
import { DashboardContent } from '../components/dashboard-content'
import { Button } from '@/components/ui/button'
import { FastLink } from '@/components/ui/fast-link'

export function DashboardView() {
  return (
    <section className="container py-8 md:py-12">
      <div className="flex flex-row items-start justify-between pb-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
        </div>
        <Button asChild>
          <FastLink to="/countdown/new">
            <Plus className="h-4 w-4" />
            New Countdown
          </FastLink>
        </Button>
      </div>

      <DashboardContent />
    </section>
  )
}
