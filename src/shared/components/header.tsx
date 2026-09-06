import { Badge } from "lucide-react";
import { Link } from "react-router";
import { DiscordLogo, GithubLogo } from "@/shared/components/logos";

export function Header({ title }: { title: string }) {
	return (
		<header className="z-50 flex h-[7vh] w-full shrink-0 items-center border-border/50 border-b bg-card/40 px-4 shadow-sm md:px-8 md:backdrop-blur-xl">
			<div className="flex flex-1 items-center justify-between gap-2">
				<div className="flex min-w-0 items-center gap-2">
					<div className="shrink-0 rounded-lg bg-primary/10 p-2">
						<Badge className="size-5 text-primary" />
					</div>
					<span className="max-w-37.5 truncate font-bold text-xs sm:max-w-none sm:text-base">
						{title}
					</span>
				</div>
				<div className="flex shrink-0 items-center gap-4 sm:gap-12">
					<div className="flex items-center gap-2">
						<GithubLogo />
						<DiscordLogo />
					</div>
					<Link to="/" className="font-bold text-sm sm:text-base">
						Home
					</Link>
				</div>
			</div>
		</header>
	);
}
