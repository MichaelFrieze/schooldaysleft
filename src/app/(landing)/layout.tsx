import { LandingLayout } from "@/modules/landing/ui/layouts/landing-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
