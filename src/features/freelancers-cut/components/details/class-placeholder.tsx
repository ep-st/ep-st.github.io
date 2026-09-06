import { Card, CardHeader } from "@/shared/components/ui/card";

export function ClassPlaceholder() {
	return (
		<Card className="flex w-full flex-col gap-4 rounded-2xl border-border/50 bg-card/60 px-4 py-4 shadow-lg ring-1 ring-primary/5 transition-all duration-300 hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="flex flex-row items-center justify-between px-1 py-0">
				<div className="flex select-none flex-row items-center gap-4">
					<div className="h-6 w-1 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
					<span className="font-bold text-[18px] text-foreground/90 tracking-tight">
						Class
					</span>
				</div>
				<div className="flex items-center gap-1">
					<span className="px-2 py-1 font-black text-[16px] text-primary/90">
						Freelancer
					</span>
				</div>
			</CardHeader>
		</Card>
	);
}
