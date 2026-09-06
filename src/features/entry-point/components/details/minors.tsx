import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import type { Perk } from "@/features/entry-point/types";
import { minors } from "@/features/entry-point/config/perks/minors";
import { Perks } from "@/features/entry-point/config/perks";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectUnlockedMinorPerksMap } from "@/features/entry-point/store/selectors";
import { cn } from "@/shared/lib/utils";

const WEAPON_TRAININGS = [
  Perks.SmgTraining,
  Perks.RifleTraining,
  Perks.PistolTraining,
  Perks.SniperTraining,
  Perks.ShotgunTraining,
  Perks.HeavyWeaponsTraining,
];

export default function MinorPerksDetails() {
  const perks = Object.values(minors).filter(
    (perk) => !WEAPON_TRAININGS.includes(perk),
  );

  return (
    <Card className="bg-card/60 border-border/50 ring-secondary/5 hover:ring-secondary/10 flex h-fit w-full shrink-0 flex-col gap-3 rounded-xl p-4 ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="bg-secondary h-6 w-1 rounded-full shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
        <span className="text-foreground/90 text-lg font-bold tracking-tight">
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
          "bg-secondary/10 border-secondary/15 shadow-sm",
          "hover:bg-secondary/15 hover:border-secondary/40",
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
            "flex-1 truncate overflow-hidden text-[11px] leading-tight font-bold tracking-tight whitespace-nowrap",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
          title={perk.name}
        >
          {perk.name}
        </ItemTitle>

        <div className="flex w-5 shrink-0 justify-end">
          {count > 0 && (
            <span className="bg-secondary text-secondary-foreground flex h-4 min-w-4 items-center justify-center rounded-md px-1 text-[10px] font-black tabular-nums">
              {count}
            </span>
          )}
        </div>
      </ItemContent>
    </Item>
  );
}
