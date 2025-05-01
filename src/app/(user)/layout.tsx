import { PreferencesLayout } from "@/modules/user-preferences/ui/layouts/preferences-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <PreferencesLayout>{children}</PreferencesLayout>;
};

export default Layout;
