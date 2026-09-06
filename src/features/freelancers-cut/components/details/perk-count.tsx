import { Card, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";

export default function PerkCount() {
  const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
  const unlockedPerkCount = useFreelancersCutStore((s) => s.unlockedNodes.size);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 w-full rounded-xl p-3 shadow-lg ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-1 py-0 select-none">
        <div className="text-foreground/90 text-[15px] font-bold tracking-tight">
          Perks:
        </div>
        <div
          className={cn(
            "text-[14px] font-bold",
            unlockedPerkCount >= perkLimit
              ? "text-destructive"
              : "text-primary",
          )}
        >
          {unlockedPerkCount}/{perkLimit}
        </div>
      </CardHeader>
    </Card>
  );
}
