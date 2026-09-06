import { Perks } from "@/features/entry-point/config/perks";
import { useEntryPointStore } from "@/features/entry-point/store";
import type { Perk } from "@/features/entry-point/types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import {
	selectUnlockedMinorPerksMap,
	selectUnlockedWeaponMasteries,
} from "../../store/selectors/select-perks";

const MASTER_TRAINING_MAP: Record<string, Perk> = {
	"Pistol Mastery": Perks.PistolTraining,
	"SMG Mastery": Perks.SmgTraining,
	"Rifle Mastery": Perks.RifleTraining,
	"Shotgun Mastery": Perks.ShotgunTraining,
	"Heavy Weapons Mastery": Perks.HeavyWeaponsTraining,
	"Sniper Mastery": Perks.SniperTraining,
};

function WeaponMasteryItem({ mastery }: { mastery: Perk }) {
	const trainingPerk = MASTER_TRAINING_MAP[mastery.name];
	const trainingCount = useEntryPointStore(
		(store) => selectUnlockedMinorPerksMap(store).get(trainingPerk) ?? 0,
	);

	return (
		<Item
			variant="outline"
			className="group relative w-full cursor-default overflow-hidden rounded-lg border-transparent bg-primary/10 px-2.5 py-2.5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/15"
		>
			<ItemContent className="flex w-full flex-row items-center gap-2">
				<div className="relative flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/20 transition-all duration-500">
					<img
						src={mastery.icon}
						alt={mastery.name}
						title={mastery.description}
						width={16}
						height={16}
						className="z-10"
					/>
				</div>

				<ItemTitle
					className="flex-1 overflow-hidden truncate whitespace-nowrap font-bold text-[11px] text-foreground leading-tight tracking-tight"
					title={mastery.name}
				>
					{mastery.name}
				</ItemTitle>

				<div className="flex shrink-0 items-center gap-2">
					<span className="font-bold text-[10px] text-muted-foreground tracking-widest">
						Training:
					</span>
					<div className="flex w-5 justify-end">
						<span className="flex h-4 min-w-4 items-center justify-center rounded-md bg-primary px-1 font-black text-[10px] text-primary-foreground tabular-nums">
							{trainingCount}
						</span>
					</div>
				</div>
			</ItemContent>
		</Item>
	);
}

export function WeaponMasteriesDetails() {
	const masteriesUnlocked = useEntryPointStore(selectUnlockedWeaponMasteries);

	return (
		<Card className="flex h-fit w-full shrink-0 flex-col gap-3 rounded-xl border-border/50 bg-card/60 p-4 ring-1 ring-primary/5 transition-all duration-300 hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center gap-3 px-1 py-0">
				<div className="h-6 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
				<span className="font-bold text-foreground/90 text-lg tracking-tight">
					Weapon Masteries
				</span>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				{masteriesUnlocked.size === 0 ? (
					<div className="flex flex-col items-center justify-center px-4 py-6 text-center">
						<span className="font-bold text-[11px] text-muted-foreground/40 tracking-[0.2em]">
							No Masteries Unlocked
						</span>
					</div>
				) : (
					<div className="mt-3 grid grid-cols-1 gap-2">
						{[...masteriesUnlocked].map((mastery) => (
							<WeaponMasteryItem key={mastery.name} mastery={mastery} />
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
