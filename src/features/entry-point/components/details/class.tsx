import { getClassPerksTitle } from "@/features/entry-point/core/getClassPerksTitle";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { selectUnlockedClassPerks } from "../../store/selectors/select-perks";

export function ClassDetails() {
	const classesUnlocked = useEntryPointStore(selectUnlockedClassPerks);

	return (
		<Card className="flex w-full flex-col gap-4 rounded-2xl border-border/50 bg-card/60 px-4 py-5 shadow-lg ring-1 ring-primary/5 transition-all duration-300 hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="flex flex-row items-center justify-between px-1 py-0">
				<div className="flex select-none flex-row items-center gap-4">
					<div className="h-6 w-1 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
					<span className="font-bold text-foreground/90 text-xl tracking-tight">
						Class
					</span>
				</div>
				<div className="flex items-center gap-1">
					<div className="flex -space-x-3">
						{[...classesUnlocked].map((perk, _i) => (
							<div key={perk.name} className="group relative">
								<img
									src={perk.icon}
									width={32}
									title={perk.description}
									height={32}
									alt={perk.name}
									className="relative z-10 rounded-full border-2 border-card bg-muted/80 shadow-sm transition-transform hover:z-100 group-hover:scale-110"
								/>
								<div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
							</div>
						))}
					</div>
					<span className="px-2 py-1 font-black text-[16px] text-primary/90">
						{getClassPerksTitle(classesUnlocked)}
					</span>
				</div>
			</CardHeader>
		</Card>
	);
}
