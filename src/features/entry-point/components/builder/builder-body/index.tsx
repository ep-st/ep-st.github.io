import { Card, CardContent } from "@/shared/components/ui/card";
import { PerkSelector } from "./perk-selector";
import { TargetList } from "./target-list";

export default function BuilderBody() {
  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl shadow-md ring-1 md:backdrop-blur-md">
      <CardContent className="flex h-full min-h-0 flex-col gap-2 px-4 py-1.5">
        <div className="shrink-0">
          <PerkSelector />
        </div>

        <div className="min-h-0 flex-1 scrollbar-none overflow-y-auto rounded-lg [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TargetList />
        </div>
      </CardContent>
    </Card>
  );
}
