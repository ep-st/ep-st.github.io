import { BuilderHeader } from "./builder-header";
import BuilderBody from "./builder-body";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Wrench } from "lucide-react";

export default function Builder() {
  return (
    <div className="flex flex-col gap-3.5 w-full h-full p-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <BuilderHeader />

      <Card className="flex-1 min-h-0 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 rounded-xl shadow-md flex flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
          <div className="p-3 rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Wrench className="size-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground max-w-xs leading-relaxed">
            Coming soon.
            <br />
            This feature is currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
