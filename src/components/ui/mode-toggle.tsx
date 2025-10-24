import { MoonIcon, SunIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useTheme } from '../providers/theme-provider'
import type { VariantProps } from 'class-variance-authority'

import type { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsClient } from '@/hooks/use-is-client'
import { cn } from '@/lib/utils'

interface ModeToggleProps extends VariantProps<typeof buttonVariants> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ModeToggleBtn({
  variant = 'outline',
  size = 'icon',
}: ModeToggleProps) {
  const mounted = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
  }

  if (!mounted) {
    // For ghost variant, use small centered skeleton to match icon size
    if (variant === 'ghost') {
      return (
        <div
          className={cn(
            'flex items-center justify-center',
            size === 'sm' && 'h-8 w-8',
            size === 'lg' && 'h-10 w-10',
            size === 'icon' && 'size-9',
            size === 'default' && 'h-9 w-9',
          )}
        >
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      )
    }

    // For other variants, use full-size skeleton
    return (
      <Skeleton
        className={cn(
          'rounded-md',
          size === 'sm' && 'h-8 w-8',
          size === 'lg' && 'h-10 w-10',
          size === 'icon' && 'size-9',
          size === 'default' && 'h-9 w-9',
        )}
      />
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'group/toggle cursor-pointer',
        size === 'sm' && 'w-8',
        size === 'lg' && 'w-10',
        size === 'default' && 'w-9',
        // icon size is already square (size-9)
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function ModeDropdownBtn({
  variant = 'outline',
  size = 'icon',
}: ModeToggleProps) {
  const mounted = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  if (!mounted) {
    // For ghost variant, use small centered skeleton to match icon size
    if (variant === 'ghost') {
      return (
        <div
          className={cn(
            'flex items-center justify-center',
            size === 'sm' && 'h-8 w-8',
            size === 'lg' && 'h-10 w-10',
            size === 'icon' && 'size-9',
            size === 'default' && 'h-9 w-9',
          )}
        >
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      )
    }

    // For other variants, use full-size skeleton
    return (
      <Skeleton
        className={cn(
          'rounded-md',
          size === 'sm' && 'h-8 w-8',
          size === 'lg' && 'h-10 w-10',
          size === 'icon' && 'size-9',
          size === 'default' && 'h-9 w-9',
        )}
      />
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'group/toggle',
            size === 'sm' && 'w-8',
            size === 'lg' && 'w-10',
            size === 'default' && 'w-9',
            // icon size is already square (size-9)
          )}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
