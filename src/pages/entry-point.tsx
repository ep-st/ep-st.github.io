import { Editor } from "@/features/entry-point/components/editor";
import { Sidebar } from "@/features/entry-point/components/sidebar";
import { UrlSync } from "@/features/entry-point/components/url-sync";
import { Header } from "@/shared/components/header";
import { Card } from "@/shared/components/ui/card";

export function EntryPoint() {
	return (
		<div className="flex flex-col items-center justify-center overflow-hidden bg-background selection:bg-primary/30 xl:h-screen xl:w-screen">
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
			<UrlSync />

			<Header title="Entry Point Skill Tree Editor" />

			<main className="relative z-10 mx-auto flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-10 overflow-hidden p-4 xl:flex-row xl:p-10">
				<Card className="group flex aspect-square max-h-full w-full overflow-hidden rounded-2xl bg-card/60 ring-1 ring-primary/10 transition-all duration-500 hover:ring-primary/20 md:backdrop-blur-md lg:w-1/2">
					<Editor />
				</Card>

				<div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden lg:max-w-220">
					<Sidebar />
				</div>
			</main>

			<footer className="z-50 flex h-[4vh] w-full shrink-0 items-center justify-between border-border/40 border-t bg-muted/10 px-8" />
		</div>
	);
}
