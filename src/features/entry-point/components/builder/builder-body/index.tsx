import { Card, CardContent } from "@/shared/components/ui/card";
import { PerkSelector } from "./perk-selector";
import { TargetList } from "./target-list";

export default function BuilderBody() {
  return (
    <Card className="flex-1 min-h-0 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 rounded-xl shadow-md flex flex-col overflow-hidden">
      <CardContent className="px-4 py-1.5 flex flex-col h-full min-h-0 gap-2">
        <div className="shrink-0">
          <PerkSelector />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 rounded-lg scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TargetList />
        </div>
      </CardContent>
    </Card>
  );
}
