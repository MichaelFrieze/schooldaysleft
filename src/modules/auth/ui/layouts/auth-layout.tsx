import { Footer } from "@/components/footer";
import { AuthNavbar } from "../components/auth-navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <>
      <AuthNavbar />
      <main className="flex min-h-screen items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
};
