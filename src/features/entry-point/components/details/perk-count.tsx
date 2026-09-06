import { useEntryPointStore } from "@/features/entry-point/store";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export function PerkCount() {
	const perkLimit = useEntryPointStore((s) => s.perkLimit);
	const unlockedPerkCount = useEntryPointStore((s) => s.unlockedNodes.size);

	return (
		<Card className="w-full rounded-xl border-border/50 bg-card/60 p-3 ring-1 ring-primary/5 transition-all duration-300 hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center justify-between gap-2 px-1 py-0">
				<div className="font-bold text-[15px] text-foreground/90 tracking-tight">
					Perks:
				</div>
				<div
					className={cn(
						"font-bold text-[14px]",
						unlockedPerkCount >= perkLimit
							? "text-destructive"
							: "text-primary",
					)}
				>
					{unlockedPerkCount}/{perkLimit}
				</div>
			</CardHeader>
		</Card>
	);
}
