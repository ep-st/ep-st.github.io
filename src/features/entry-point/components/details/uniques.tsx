import { uniques } from "@/features/entry-point/config/perks/uniques";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import type { Perk } from "@/features/entry-point/types";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectUnlockedUniquePerks } from "@/features/entry-point/store/selectors";
import { cn } from "@/shared/lib/utils";

export default function UniquePerksDetails() {
  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 flex h-fit flex-1 shrink-0 gap-2 rounded-xl p-3 ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center gap-2 px-1 py-0 select-none">
        <div className="bg-primary h-5 w-1 rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" />
        <span className="text-foreground/90 text-base font-bold tracking-tight">
          Unique Perks
        </span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="mt-2 grid grid-cols-1 gap-1.5 md:grid-cols-2 lg:grid-cols-1">
          {Object.values(uniques).map((perk) => (
            <UniquePerkItem key={perk.name} perk={perk} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface Props {
  perk: Perk;
}

export function UniquePerkItem({ perk }: Props) {
  const isUnlocked = useEntryPointStore((store) =>
    selectUnlockedUniquePerks(store).has(perk),
  );

  return (
    <Item
      variant="outline"
      className={cn(
        "group relative w-full cursor-default overflow-hidden rounded-lg border-transparent p-1.5 transition-all duration-300",
        "bg-muted/30 hover:bg-muted/40",
        isUnlocked && [
          "bg-primary/10 border-primary/10 shadow-sm",
          "hover:bg-primary/15 hover:border-primary/30",
        ],
      )}
    >
      <ItemContent className="flex flex-row items-center gap-2">
        <div
          className={cn(
            "relative flex size-7 shrink-0 items-center justify-center rounded-md transition-all duration-500",
            isUnlocked
              ? "bg-primary/20"
              : "bg-muted/50 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0",
          )}
        >
          <img
            src={perk.icon}
            alt={perk.name}
            title={perk.description}
            width={18}
            height={18}
            className="z-10"
          />
        </div>

        <ItemTitle
          className={cn(
            "flex-1 truncate text-[12px] font-bold tracking-tight",
            isUnlocked ? "text-foreground" : "text-muted-foreground/60",
          )}
        >
          {perk.name}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
}
