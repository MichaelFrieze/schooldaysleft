import { Footer } from "@/components/footer";
import { CountdownNavbar } from "../components/countdown-navbar";

interface CountdownLayoutProps {
  children: React.ReactNode;
}

export const CountdownLayout = ({ children }: CountdownLayoutProps) => {
  return (
    <>
      <CountdownNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
