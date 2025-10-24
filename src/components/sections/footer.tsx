import { Mail } from 'lucide-react'
import { ModeToggleBtn } from '../ui/mode-toggle'
import { buttonVariants } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 sm:py-4">
        <div className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Frieze.DEV. All rights reserved.
          </p>

          <div className="flex gap-2">
            <a
              href="https://ko-fi.com/michaelfrieze"
              target="_blank"
              aria-label="Support This App"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'ghost',
                className: 'text-muted-foreground',
              })}
            >
              Support This App
            </a>
            <a
              href="mailto:contact@schooldaysleft.com"
              target="_blank"
              aria-label="Contact us"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon',
                className: 'text-muted-foreground',
              })}
            >
              <Mail />
            </a>
            <div className="text-muted-foreground">
              <ModeToggleBtn variant={'ghost'} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
