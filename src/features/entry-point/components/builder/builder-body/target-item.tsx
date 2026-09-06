import type { Perk } from "@/features/entry-point/types";
import { useEntryPointStore } from "@/features/entry-point/store";
import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import { Button } from "@/shared/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

// Compute maxCounts once statically
const maxCounts = new Map<string, number>();
for (const entry of Object.values(PERK_ENTRIES)) {
  maxCounts.set(entry.perk.name, (maxCounts.get(entry.perk.name) ?? 0) + 1);
}

interface TargetItemProps {
  target: { perk: Perk; amount: number };
}

export function TargetItem({ target }: TargetItemProps) {
  const removeBuilderTarget = useEntryPointStore((s) => s.removeBuilderTarget);
  const setBuilderTargetAmount = useEntryPointStore(
    (s) => s.setBuilderTargetAmount,
  );

  const maxAmount = maxCounts.get(target.perk.name) ?? 1;

  const handleDecrease = (by: number) => {
    setBuilderTargetAmount(target.perk, Math.max(target.amount - by, 1));
  };

  const handleIncrease = (by: number) => {
    setBuilderTargetAmount(
      target.perk,
      Math.min(target.amount + by, maxAmount),
    );
  };

  return (
    <div className="group flex items-center justify-between p-2.5 rounded-xl bg-background/50 border border-border/40 hover:border-primary/30 hover:bg-background/80 hover:shadow-sm transition-all duration-300 gap-2">
      {/* Icon and Name */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative size-8 rounded-lg bg-muted flex items-center justify-center p-1 border border-border/40 group-hover:border-primary/20 shrink-0 transition-colors shadow-sm">
          <img
            src={target.perk.icon}
            alt={target.perk.name}
            className="size-full object-contain filter group-hover:brightness-110 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-bold text-foreground/90 group-hover:text-foreground truncate leading-snug">
            {target.perk.name}
          </span>
          {maxAmount > 1 && (
            <span className="text-[10px] text-muted-foreground font-medium select-none">
              Goal: {target.amount} / {maxAmount}
            </span>
          )}
        </div>
      </div>

      {/* Actions (Count and Delete) */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Quantity Controls (Only show if maxAmount > 1) */}
        {maxAmount > 1 && (
          <div className="flex items-center bg-muted/40 border border-border/50 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={() => handleDecrease(1)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDecrease(3);
              }}
              disabled={target.amount <= 1}
              className="size-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all cursor-pointer disabled:cursor-not-allowed"
              title="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-6 text-center text-[12px] font-bold text-foreground tabular-nums select-none">
              {target.amount}
            </span>
            <button
              onClick={() => handleIncrease(1)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleIncrease(3);
              }}
              disabled={target.amount >= maxAmount}
              className="size-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all cursor-pointer disabled:cursor-not-allowed"
              title="Increase quantity"
            >
              <Plus className="size-3" />
            </button>
          </div>
        )}

        {/* Delete Button */}
        <Button
          variant="destructive"
          size="icon-xs"
          onClick={() => removeBuilderTarget(target.perk)}
          className="rounded-lg h-7 w-7 opacity-75 group-hover:opacity-100 transition-opacity duration-300 font-bold"
          title="Remove target"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
