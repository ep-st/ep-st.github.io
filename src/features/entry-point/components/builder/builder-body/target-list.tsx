import { useMemo } from "react";
import { Zap, ChevronDown } from "lucide-react";
import type { Perk } from "@/features/entry-point/types";
import { PerkType } from "@/features/entry-point/types";
import { useEntryPointStore } from "@/features/entry-point/store";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/ui/collapsible";
import { TargetItem } from "./target-item";

interface GroupedItem {
  perk: Perk;
  amount: number;
}

const PERK_TYPE_LABELS: Partial<Record<PerkType, string>> = {
  [PerkType.Minor]: "Minor",
  [PerkType.Unique]: "Unique",
  [PerkType.Class]: "Class",
};

const PERK_TYPE_ORDER: PerkType[] = [
  PerkType.Minor,
  PerkType.Unique,
  PerkType.Class,
];

export function TargetList() {
  const targets = useEntryPointStore((s) => s.builderTargets);

  const grouped = useMemo(() => {
    const groups = new Map<PerkType, GroupedItem[]>();
    for (const [perk, amount] of targets) {
      const list = groups.get(perk.perkType);
      if (list) list.push({ perk, amount });
      else groups.set(perk.perkType, [{ perk, amount }]);
    }
    return PERK_TYPE_ORDER.map((type) => ({
      type,
      label: PERK_TYPE_LABELS[type],
      items: groups.get(type) ?? [],
    })).filter((g) => g.items.length > 0);
  }, [targets]);

  const totalTargets = targets.size;

  if (totalTargets === 0) {
    return (
      <div className="text-muted-foreground flex h-full flex-col items-center justify-center p-4 text-center select-none">
        <Zap className="text-muted-foreground/20 mb-2 size-8" />
        <span className="text-foreground/60 text-[13px] font-semibold">
          No targets added yet
        </span>
        <span className="text-muted-foreground/70 mt-0.5 max-w-50 text-[11px]">
          Use search above to pick perks for the optimal path.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {grouped.map(({ type, label, items }) => (
        <Collapsible key={type} defaultOpen>
          <CollapsibleTrigger className="group flex w-full cursor-pointer items-center gap-2 px-1 py-1.5 text-left select-none">
            <ChevronDown className="text-muted-foreground/50 size-3.5 transition-transform duration-200 group-data-[state=closed]:-rotate-90" />
            <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
              {label}
            </span>
            <span className="text-muted-foreground/60 bg-muted/40 ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums">
              {items.length}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-1.5 pl-1">
            {items.map((item) => (
              <TargetItem key={item.perk.name} target={item} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
