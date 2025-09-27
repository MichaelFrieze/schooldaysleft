import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clickHandlers } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, LayoutDashboard, Plus } from "lucide-react";

export function CountdownNavDropdown() {
	const navigate = useNavigate();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="min-w-0 max-w-64 gap-2 focus-visible:ring-1"
				>
					<span className="min-w-0 flex-1 truncate">Current Page Name</span>
					<ChevronDown className="h-4 w-4 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-45">
				<DropdownMenuItem asChild>
					<Link
						to="/dashboard"
						{...clickHandlers(() =>
							navigate({
								to: "/dashboard",
							}),
						)}
					>
						<LayoutDashboard />
						Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						to="/dashboard"
						{...clickHandlers(() =>
							navigate({
								to: "/dashboard",
							}),
						)}
					>
						Countdown Name
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						to="/dashboard"
						{...clickHandlers(() =>
							navigate({
								to: "/dashboard",
							}),
						)}
					>
						<Plus />
						New Countdown
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
