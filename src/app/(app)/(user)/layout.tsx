import { UserLayout } from "@/modules/user/ui/layouts/user-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <UserLayout>{children}</UserLayout>;
};

export default Layout;
