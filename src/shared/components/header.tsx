import { DiscordLogo, GithubLogo } from "@/shared/components/logos";
import { Badge } from "lucide-react";
import { Link } from "react-router";

export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-card/40 border-border/50 z-50 flex h-[7vh] w-full shrink-0 items-center border-b px-4 shadow-sm md:px-8 md:backdrop-blur-xl">
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="bg-primary/10 shrink-0 rounded-lg p-2">
            <Badge className="text-primary size-5" />
          </div>
          <span className="max-w-[150px] truncate text-xs font-bold sm:max-w-none sm:text-base">
            {title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4 sm:gap-12">
          <div className="flex items-center gap-2">
            <GithubLogo />
            <DiscordLogo />
          </div>
          <Link to={"/"} className="text-sm font-bold sm:text-base">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
