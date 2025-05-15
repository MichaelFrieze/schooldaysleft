import { Footer } from "@/components/footer";
import { LandingNavbar } from "../components/landing-navbar";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
