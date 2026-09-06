import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { useEntryPointStore } from "@/features/entry-point/store";
import {
  selectUnlockedWeaponMasteries,
  selectUnlockedMinorPerksMap,
} from "@/features/entry-point/store/selectors";
import { Perks } from "@/features/entry-point/config/perks";
import type { Perk } from "@/features/entry-point/types";
import { cn } from "@/shared/lib/utils";

const MASTER_TRAINING_MAP: Record<string, Perk> = {
  "Pistol Mastery": Perks.PistolTraining,
  "SMG Mastery": Perks.SmgTraining,
  "Rifle Mastery": Perks.RifleTraining,
  "Shotgun Mastery": Perks.ShotgunTraining,
  "Heavy Weapons Mastery": Perks.HeavyWeaponsTraining,
  "Sniper Mastery": Perks.SniperTraining,
};

export default function WeaponMasteriesDetails() {
  const masteriesUnlocked = useEntryPointStore(selectUnlockedWeaponMasteries);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 flex h-fit w-full shrink-0 flex-col gap-3 rounded-xl p-4 ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="bg-primary h-6 w-1 rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
        <span className="text-foreground/90 text-lg font-bold tracking-tight">
          Weapon Masteries
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {masteriesUnlocked.size === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
            <span className="text-muted-foreground/40 text-[11px] font-bold tracking-[0.2em]">
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

function WeaponMasteryItem({ mastery }: { mastery: Perk }) {
  const trainingPerk = MASTER_TRAINING_MAP[mastery.name];
  const trainingCount = useEntryPointStore(
    (store) => selectUnlockedMinorPerksMap(store).get(trainingPerk) ?? 0,
  );

  return (
    <Item
      variant="outline"
      className="group bg-primary/10 hover:bg-primary/15 hover:border-primary/40 relative w-full cursor-default overflow-hidden rounded-lg border-transparent px-2.5 py-2.5 shadow-sm transition-all duration-300"
    >
      <ItemContent className="flex w-full flex-row items-center gap-2">
        <div className="bg-primary/20 relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500">
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
          className="text-foreground flex-1 truncate overflow-hidden text-[11px] leading-tight font-bold tracking-tight whitespace-nowrap"
          title={mastery.name}
        >
          {mastery.name}
        </ItemTitle>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest">
            Training:
          </span>
          <div className="flex w-5 justify-end">
            <span className="bg-primary text-primary-foreground flex h-4 min-w-4 items-center justify-center rounded-md px-1 text-[10px] font-black tabular-nums">
              {trainingCount}
            </span>
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}
