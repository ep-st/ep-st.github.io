import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Wrench, X } from "lucide-react";

export function BuilderHeader() {
  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 shrink-0 overflow-hidden rounded-xl shadow-md ring-1 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 py-0 select-none">
        <div className="flex min-w-0 items-center gap-2">
          <div className="bg-primary/10 shrink-0 rounded p-1">
            <Wrench className="text-primary size-4" />
          </div>

          <CardTitle className="text-foreground/90 text-[15px] leading-none font-bold">
            Path Builder
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
