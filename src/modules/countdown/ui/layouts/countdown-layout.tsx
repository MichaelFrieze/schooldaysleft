import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

interface CountdownLayoutProps {
  children: React.ReactNode;
}

export const CountdownLayout = ({ children }: CountdownLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
