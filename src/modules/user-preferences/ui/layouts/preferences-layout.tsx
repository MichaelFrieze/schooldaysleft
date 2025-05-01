import { PreferencesFooter } from "../components/preferences-footer";
import { PreferencesNavbar } from "../components/preferences-navbar";

interface PreferencesLayoutProps {
  children: React.ReactNode;
}

export const PreferencesLayout = ({ children }: PreferencesLayoutProps) => {
  return (
    <>
      <PreferencesNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <PreferencesFooter />
    </>
  );
};
