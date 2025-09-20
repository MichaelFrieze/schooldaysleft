import { Footer } from "@/components/sections/footer";
import { AuthNavbar } from "../components/auth-navbar";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: MarketingLayoutProps) {
	return (
		<>
			<AuthNavbar />
			<main className="min-h-[calc(100vh-64px)]">{children}</main>
			<Footer />
		</>
	);
}
