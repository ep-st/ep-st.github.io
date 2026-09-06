import { Card, CardContent } from "@/shared/components/ui/card";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { RootNode } from "@/features/freelancers-cut/types";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { cn } from "@/shared/lib/utils";
import { GitBranch } from "lucide-react";

export default function RootNodeSelector() {
  const rootNode = useFreelancersCutStore((s) => s.rootNode);
  const setRootNode = useFreelancersCutStore((s) => s.setRootNode);

  const rootNodes = Object.entries(RootNode).map(([_, id]) => ({
    name: PERK_ENTRIES[id].perk.name,
    icon: PERK_ENTRIES[id].perk.icon,
    id,
  }));

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 overflow-hidden rounded-xl shadow-md ring-1 transition-all md:backdrop-blur-md">
      <CardContent className="px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded p-1">
              <GitBranch className="text-primary size-4" />
            </div>
            <span className="text-foreground/90 text-[13px] font-bold">
              Root Node
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {rootNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setRootNode(node.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all",
                  rootNode === node.id
                    ? "bg-primary/10 border-primary/30 ring-primary/20 ring-1"
                    : "bg-muted/30 hover:bg-muted/50 border-transparent",
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    rootNode === node.id ? "bg-primary/20" : "bg-muted",
                  )}
                >
                  <img
                    src={node.icon}
                    alt={node.name}
                    className={cn(
                      "size-5 rounded-full",
                      rootNode !== node.id && "opacity-50 grayscale",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "flex-1 truncate text-[12px] font-bold",
                    rootNode === node.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {node.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
