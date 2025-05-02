import { MarketingLayout } from "@/modules/marketing/ui/layouts/marketing-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <MarketingLayout>{children}</MarketingLayout>;
};

export default Layout;
