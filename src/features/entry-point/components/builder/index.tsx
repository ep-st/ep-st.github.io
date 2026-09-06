import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { BuilderHeader } from "./builder-header";

export function Builder() {
	return (
		<div className="fade-in slide-in-from-bottom-2 flex h-full w-full animate-in flex-col gap-3.5 p-1 duration-500">
			<BuilderHeader />

			<Card className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-border/50 bg-card/60 shadow-md ring-1 ring-primary/5 md:backdrop-blur-md">
				<CardContent className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
					<div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20">
						<Wrench className="size-5 text-primary" />
					</div>
					<p className="max-w-xs font-medium text-muted-foreground text-sm leading-relaxed">
						Coming soon.
						<br />
						This feature is currently under development.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
