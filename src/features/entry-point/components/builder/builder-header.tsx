import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Wrench, X } from "lucide-react";

export function BuilderHeader() {
  return (
    <Card className="bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 rounded-xl shadow-md overflow-hidden shrink-0">
      <CardHeader className="px-4 py-0 select-none flex flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded bg-primary/10 shrink-0">
            <Wrench className="size-4 text-primary" />
          </div>

          <CardTitle className="text-[15px] leading-none font-bold text-foreground/90 ">
            Path Builder
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
