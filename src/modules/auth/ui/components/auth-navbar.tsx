import { FastLink } from '@/components/ui/fast-link'

export function AuthNavbar() {
  return (
    <header>
      <div className="container flex h-16 items-center">
        <FastLink to="/" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </FastLink>
      </div>
    </header>
  )
}
