import { Perks } from "@/features/entry-point/config/perks";
import { minors } from "@/features/entry-point/config/perks/minors";
import { useEntryPointStore } from "@/features/entry-point/store";
import type { Perk } from "@/features/entry-point/types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { cn } from "@/shared/lib/utils";
import { selectUnlockedMinorPerksMap } from "../../store/selectors/select-perks";

const WEAPON_TRAININGS = [
	Perks.SmgTraining,
	Perks.RifleTraining,
	Perks.PistolTraining,
	Perks.SniperTraining,
	Perks.ShotgunTraining,
	Perks.HeavyWeaponsTraining,
];

interface Props {
	perk: Perk;
}

export function MinorPerkItem({ perk }: Props) {
	const count = useEntryPointStore(
		(store) => selectUnlockedMinorPerksMap(store).get(perk) ?? 0,
	);
	const isUnlocked = count > 0;

	return (
		<Item
			variant="outline"
			className={cn(
				"group relative w-full cursor-default overflow-hidden rounded-lg border-transparent px-2.5 py-2.5 transition-all duration-300",
				"bg-muted/30 hover:bg-muted/40",
				isUnlocked && [
					"border-secondary/15 bg-secondary/10 shadow-sm",
					"hover:border-secondary/40 hover:bg-secondary/15",
				],
			)}
		>
			<ItemContent className="flex w-full flex-row items-center gap-2">
				<div
					className={cn(
						"relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500",
						isUnlocked
							? "bg-secondary/20"
							: "bg-muted/50 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0",
					)}
				>
					<img
						src={perk.icon}
						alt={perk.name}
						title={perk.description}
						width={16}
						height={16}
						className="z-10"
					/>
				</div>

				<ItemTitle
					className={cn(
						"flex-1 overflow-hidden truncate whitespace-nowrap font-bold text-[11px] leading-tight tracking-tight",
						isUnlocked ? "text-foreground" : "text-muted-foreground/60",
					)}
					title={perk.name}
				>
					{perk.name}
				</ItemTitle>

				<div className="flex w-5 shrink-0 justify-end">
					{count > 0 && (
						<span className="flex h-4 min-w-4 items-center justify-center rounded-md bg-secondary px-1 font-black text-[10px] text-secondary-foreground tabular-nums">
							{count}
						</span>
					)}
				</div>
			</ItemContent>
		</Item>
	);
}

export function MinorPerksDetails() {
	const perks = Object.values(minors).filter(
		(perk) => !WEAPON_TRAININGS.includes(perk),
	);

	return (
		<Card className="flex h-fit w-full shrink-0 flex-col gap-3 rounded-xl border-border/50 bg-card/60 p-4 ring-1 ring-secondary/5 transition-all duration-300 hover:ring-secondary/10 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center gap-3 px-1 py-0">
				<div className="h-6 w-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
				<span className="font-bold text-foreground/90 text-lg tracking-tight">
					Minor Perks
				</span>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				<div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
					{perks.map((perk) => (
						<MinorPerkItem key={perk.name} perk={perk} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
