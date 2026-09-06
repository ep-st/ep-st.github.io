import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectUnlockedMinorsMap } from "@/features/freelancers-cut/store/selectors";
import { minors } from "@/features/freelancers-cut/config/perks/minors";
import type { Perk } from "@/features/freelancers-cut/types";
import { cn } from "@/shared/lib/utils";

export default function MinorPerksDetails() {
  const perks = Object.values(minors);

  return (
    <Card className="bg-card/60 border-border/50 ring-secondary/5 hover:ring-secondary/10 flex h-fit w-full shrink-0 flex-col gap-3 rounded-2xl p-4 shadow-lg ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center gap-3 px-1 py-0 select-none">
        <div className="bg-secondary h-6 w-1 rounded-full shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
        <span className="text-foreground/90 text-lg font-bold tracking-tight">
          Minor Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="grid grid-cols-1 gap-2">
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

function MinorPerkItem({ perk }: Props) {
  const count = useFreelancersCutStore(
    (store) => selectUnlockedMinorsMap(store).get(perk) ?? 0,
  );
  const isUnlocked = count > 0;

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative w-full cursor-default overflow-hidden rounded-xl border-transparent px-3 py-2 transition-all duration-300",
        "bg-muted/20 hover:bg-muted/30",
        isUnlocked && [
          "bg-secondary/5 border-secondary/10 shadow-sm",
          "hover:bg-secondary/10 hover:border-secondary/30",
        ],
      )}
    >
      <ItemContent className="flex w-full flex-row items-center gap-3">
        <div
          className={cn(
            "relative flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
            isUnlocked
              ? "bg-secondary/20 shadow-[0_0_10px_rgba(var(--secondary-rgb),0.2)]"
              : "bg-muted/50 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description(Math.max(0, count))}
            width={18}
            height={18}
            className="z-10 rounded-full"
          />
        </div>

        <ItemTitle
          className={cn(
            "flex-1 truncate text-[11px] leading-tight font-bold tracking-tight",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
          title={perk.name}
        >
          {perk.name}
        </ItemTitle>

        <div className="flex w-5 shrink-0 justify-end">
          {count > 0 && (
            <span className="bg-secondary text-secondary-foreground flex h-5 min-w-5 items-center justify-center rounded-lg px-1.5 text-[10px] font-black tabular-nums shadow-sm">
              {count}
            </span>
          )}
        </div>
      </ItemContent>
    </Item>
  );
}
