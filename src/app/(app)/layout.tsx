import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <TRPCReactProvider>
        <Toaster />
        {children}
      </TRPCReactProvider>
    </ClerkProvider>
  );
};

export default Layout;
