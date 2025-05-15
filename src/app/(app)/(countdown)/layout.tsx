import { CountdownLayout } from "@/modules/countdown/ui/layouts/countdown-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <CountdownLayout>{children}</CountdownLayout>;
};

export default Layout;
