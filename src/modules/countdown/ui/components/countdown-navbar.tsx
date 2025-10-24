import { SignedIn, SignedOut } from '@clerk/tanstack-react-start'
import { UserCircleIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { CountdownNavDropdown } from './countdown-nav-dropdown'
import { buttonVariants } from '@/components/ui/button'
import { UserButton } from '@/components/ui/user-button'
import { cn } from '@/lib/utils'

export function CountdownNavbar() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link to="/dashboard" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <CountdownNavDropdown />
          </div>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link
              to="/sign-in/$"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'rounded-full',
              )}
            >
              <UserCircleIcon />
              Sign in
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}
