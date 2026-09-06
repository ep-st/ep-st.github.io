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
    <div className="group bg-background/50 border-border/40 hover:border-primary/30 hover:bg-background/80 flex items-center justify-between gap-2 rounded-xl border p-2.5 transition-all duration-300 hover:shadow-sm">
      {/* Icon and Name */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="bg-muted border-border/40 group-hover:border-primary/20 relative flex size-8 shrink-0 items-center justify-center rounded-lg border p-1 shadow-sm transition-colors">
          <img
            src={target.perk.icon}
            alt={target.perk.name}
            className="size-full object-contain filter transition-all duration-300 group-hover:brightness-110"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-foreground/90 group-hover:text-foreground truncate text-[13px] leading-snug font-bold">
            {target.perk.name}
          </span>
          {maxAmount > 1 && (
            <span className="text-muted-foreground text-[10px] font-medium select-none">
              Goal: {target.amount} / {maxAmount}
            </span>
          )}
        </div>
      </div>

      {/* Actions (Count and Delete) */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Quantity Controls (Only show if maxAmount > 1) */}
        {maxAmount > 1 && (
          <div className="bg-muted/40 border-border/50 flex items-center rounded-lg border p-0.5 shadow-inner">
            <button
              onClick={() => handleDecrease(1)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDecrease(3);
              }}
              disabled={target.amount <= 1}
              className="text-muted-foreground hover:text-foreground hover:bg-background disabled:hover:text-muted-foreground flex size-6 cursor-pointer items-center justify-center rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              title="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="text-foreground w-6 text-center text-[12px] font-bold tabular-nums select-none">
              {target.amount}
            </span>
            <button
              onClick={() => handleIncrease(1)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleIncrease(3);
              }}
              disabled={target.amount >= maxAmount}
              className="text-muted-foreground hover:text-foreground hover:bg-background disabled:hover:text-muted-foreground flex size-6 cursor-pointer items-center justify-center rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
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
          className="h-7 w-7 rounded-lg font-bold opacity-75 transition-opacity duration-300 group-hover:opacity-100"
          title="Remove target"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
