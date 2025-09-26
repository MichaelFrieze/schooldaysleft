import { useClerkTheme } from "@/hooks/use-clerk-theme";
import { SignIn as ClerkSignIn } from "@clerk/tanstack-react-start";

export function SignInView() {
	// const [isMounted, setIsMounted] = useState(false);
	const clerkAppearanceVariables = useClerkTheme();

	// rounded-lg in tailwind: calc(var(--radius))
	const borderRadiusLg = `calc(${clerkAppearanceVariables.borderRadius})`;

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<ClerkSignIn
				routing="path"
				path="/sign-in"
				appearance={{
					variables: {
						...clerkAppearanceVariables,
					},
					layout: {
						socialButtonsVariant: "blockButton",
					},
					elements: {
						header: {
							display: "none",
						},
						main: {
							margin: "0.5rem",
						},
						card: {
							borderBottomLeftRadius: borderRadiusLg,
							borderBottomRightRadius: borderRadiusLg,
							borderTopLeftRadius: borderRadiusLg,
							borderTopRightRadius: borderRadiusLg,
						},
						cardBox: {
							maxWidth: "25rem",
							width: "calc(100vw - 4rem)",
							borderRadius: borderRadiusLg,
						},
					},
				}}
			/>
		</div>
	);
}
