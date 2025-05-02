import { Footer } from "@/components/footer";
import { MarketingNavbar } from "../components/marketing-navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <>
      <MarketingNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
