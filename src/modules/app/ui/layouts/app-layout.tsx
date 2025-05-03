import { Footer } from "@/components/footer";
import { AppNavbar } from "@/modules/app/ui/components/app-navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <AppNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
