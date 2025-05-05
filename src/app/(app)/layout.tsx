import { AppLayout } from "@/modules/app/ui/layouts/app-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
