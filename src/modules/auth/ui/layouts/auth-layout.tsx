import { Footer } from "@/components/footer";
import { AuthNavbar } from "../components/auth-navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <>
      <AuthNavbar />
      <main className="flex min-h-[calc(100vh-64px)] justify-center lg:items-center">
        {children}
      </main>
      <Footer />
    </>
  );
};
