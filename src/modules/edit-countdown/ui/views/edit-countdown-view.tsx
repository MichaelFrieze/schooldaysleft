import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { EditCountdownForm } from '@/modules/edit-countdown/ui/components/edit-countdown-form'

interface EditCountdownViewProps {
  countdownId: string
}

export const EditCountdownView = ({ countdownId }: EditCountdownViewProps) => {
  return (
    <div className="container pt-4 pb-8">
      <div className="pb-8">
        <div className="pb-8">
          <Button asChild variant="ghost">
            <Link to="/countdown/$countdownId" params={{ countdownId }}>
              <ArrowLeft className="h-4 w-4" />
              Back to Countdown
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <h1 className="pb-2 text-3xl font-bold">Edit Countdown</h1>
        </div>
      </div>
      <EditCountdownForm />
    </div>
  )
}
