import { SignedIn, SignedOut } from '@clerk/tanstack-react-start'
import { UserCircleIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { UserButton } from '@/components/ui/user-button'
import { cn } from '@/lib/utils'

export function LandingNavbar() {
  return (
    <header>
      <div className="container flex h-16 items-center">
        <Link to="/" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </Link>

        <nav className="ml-auto">
          <SignedIn>
            <div className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-foreground hidden lg:flex',
                )}
              >
                Dashboard
              </Link>
              <UserButton />
            </div>
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
