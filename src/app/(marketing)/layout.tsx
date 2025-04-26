import { MarketingLayout } from "@/modules/marketing/ui/layouts/marketing-layout";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: MarketingLayoutProps) => {
  return <MarketingLayout>{children}</MarketingLayout>;
};

export default Layout;
