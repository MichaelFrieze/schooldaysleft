import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

interface PreferencesLayoutProps {
  children: React.ReactNode;
}

export const PreferencesLayout = ({ children }: PreferencesLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
