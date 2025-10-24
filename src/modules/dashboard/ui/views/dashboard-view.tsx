import { Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { DashboardContent } from '../components/dashboard-content'
import { Button } from '@/components/ui/button'

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
          <Link to="/countdown/new">
            <Plus className="h-4 w-4" />
            New Countdown
          </Link>
        </Button>
      </div>

      <DashboardContent />
    </section>
  )
}
