import { LandingNavbar } from '../components/landing-navbar'
import { Footer } from '@/components/sections/footer'

interface LandingLayoutProps {
  children: React.ReactNode
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  )
}
