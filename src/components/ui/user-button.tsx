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
							// scrollBox: {
							// 	// borderRadius: "0rem",
							// },
							// navbarMobileMenuRow: {
							// 	// padding: "1rem",
							// },
							// modalCloseButton: {
							// 	marginTop: "0.5rem",
							// 	marginRight: "0.5rem",
							// },
							// rootBox: {
							// 	maxHeight: "2rem",
							// },
							// cardBox: {
							// 	maxHeight: "100%",
							// 	backgroundColor: "red",
							// },
							// navbar: {
							// 	// borderRadius: "0rem",
							// 	backgroundColor: "blue",
							// },
							// modalContent: {
							// 	height: "auto",
							// },
							// cardBox: {
							// 	// critical: prevent flex stretch and let height be content-driven
							// 	alignSelf: "center",
							// 	height: "auto",
							// 	maxHeight: "unset",
							// 	minHeight: "auto",
							// 	// backgroundColor: "red", // keep if you still want to visualize
							// },
							// scrollBox: {
							// 	// when content is tall, scroll inside the card instead of growing the card itself
							// 	maxHeight: "calc(100dvh - 8rem)",
							// 	overflow: "auto",
							// },
							scrollBox: {
								height: "100%",
								overflow: "auto",
								// maxHeight: "calc(100dvh - 6rem)",
							},
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
