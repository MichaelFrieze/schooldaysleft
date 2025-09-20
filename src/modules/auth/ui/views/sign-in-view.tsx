import { Button } from "@/components/ui/button";
import { useClerkTheme } from "@/hooks/use-clerk-theme";
import { SignIn as ClerkSignIn } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";

export function SignInView() {
	// const [isMounted, setIsMounted] = useState(false);
	const clerkAppearanceVariables = useClerkTheme();

	// rounded-lg in tailwind: calc(var(--radius))
	const borderRadiusLg = `calc(${clerkAppearanceVariables.borderRadius})`;

	// useEffect(() => {
	// 	setIsMounted(true);
	// }, []);

	// if (!isMounted) {
	// 	return (
	// 		<div className="flex h-screen flex-col items-center justify-center gap-4">
	// 			<Skeleton className="h-[23rem] w-[calc(100vw-4rem)] max-w-[25rem] rounded-lg" />

	// 			<Button asChild>
	// 				<Link to="/">Home</Link>
	// 			</Button>
	// 		</div>
	// 	);
	// }

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
							borderBottomLeftRadius: "0rem",
							borderBottomRightRadius: "0rem",
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

			<Button asChild>
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
}
