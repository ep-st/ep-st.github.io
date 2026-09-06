import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { Target } from "lucide-react";

export default function PerkLimit() {
  const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
  const setPerkLimit = useFreelancersCutStore((s) => s.setPerkLimit);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 overflow-hidden rounded-xl shadow-md ring-1 transition-all md:backdrop-blur-md">
      <CardContent className="px-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded p-1">
                <Target className="text-primary size-4" />
              </div>
              <span className="text-foreground/90 text-[13px] font-bold">
                Limit
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-primary text-xl leading-none font-black tabular-nums">
                {perkLimit}
              </span>
              <div className="flex gap-1">
                {[50].map((val) => (
                  <button
                    key={val}
                    onClick={() => setPerkLimit(val)}
                    className={cn(
                      "rounded border px-2 py-0.5 text-[10px] font-black transition-all",
                      perkLimit === val
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted border-transparent",
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="50"
            value={perkLimit}
            onChange={(e) => setPerkLimit(parseInt(e.target.value))}
            className="bg-muted accent-primary h-1.5 w-full cursor-pointer appearance-none rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
