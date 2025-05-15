import { Footer } from "@/components/footer";
import { UserNavbar } from "../components/user-navbar";

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <>
      <UserNavbar />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Footer />
    </>
  );
};
