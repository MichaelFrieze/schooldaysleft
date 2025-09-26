import { useClerkTheme } from "@/hooks/use-clerk-theme";
import { UserButton as ClerkUserButton } from "@clerk/tanstack-react-start";
import { Home, LayoutDashboard } from "lucide-react";
import { Skeleton } from "./skeleton";

export function UserButton() {
	// const [isMounted, setIsMounted] = useState(false);
	const clerkAppearanceVariables = useClerkTheme();

	// rounded-lg in tailwind: calc(var(--radius))
	const borderRadiusLg = `calc(${clerkAppearanceVariables.borderRadius})`;

	return (
		<div className="flex items-center justify-center">
			<ClerkUserButton
				fallback={<Skeleton className="h-8 w-8 rounded-full" />}
				appearance={{
					elements: {
						avatarBox: {
							height: "2rem",
							width: "2rem",
						},
						userButtonPopoverMain: {
							borderBottomLeftRadius: borderRadiusLg,
							borderBottomRightRadius: borderRadiusLg,
						},
						userButtonPopoverCard: {
							borderRadius: borderRadiusLg,
						},
					},
					variables: {
						...clerkAppearanceVariables,
					},
				}}
				userProfileProps={{
					appearance: {
						variables: {
							...clerkAppearanceVariables,
						},
						elements: {
							scrollBox: {
								// borderRadius: "0rem",
							},
							navbarMobileMenuRow: {
								// padding: "1rem",
							},
							navbar: {
								// borderRadius: "0rem",
							},
							// modalCloseButton: {
							// 	marginTop: "0.5rem",
							// 	marginRight: "0.5rem",
							// },
						},
					},
				}}
			>
				<ClerkUserButton.MenuItems>
					<ClerkUserButton.Link
						label="Dashboard"
						href="/dashboard"
						labelIcon={<LayoutDashboard className="size-4" />}
					/>
					<ClerkUserButton.Action label="manageAccount" />
					<ClerkUserButton.Link
						label="Home"
						href="/"
						labelIcon={<Home className="size-4" />}
					/>
				</ClerkUserButton.MenuItems>
			</ClerkUserButton>
		</div>
	);
}
