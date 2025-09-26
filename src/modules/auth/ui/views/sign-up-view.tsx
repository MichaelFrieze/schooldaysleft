import { useClerkTheme } from "@/hooks/use-clerk-theme";
import { SignUp as ClerkSignUp } from "@clerk/tanstack-react-start";

export function SignUpView() {
	const clerkAppearanceVariables = useClerkTheme();

	// rounded-lg in tailwind: calc(var(--radius))
	const borderRadiusLg = `calc(${clerkAppearanceVariables.borderRadius})`;

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<ClerkSignUp
				routing="path"
				path="/sign-up"
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
