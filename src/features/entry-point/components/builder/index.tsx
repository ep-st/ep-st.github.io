import { BuilderHeader } from "./builder-header";
import BuilderBody from "./builder-body";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Wrench } from "lucide-react";

export default function Builder() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex h-full w-full flex-col gap-3.5 p-1 duration-500">
      <BuilderHeader />

      <Card className="bg-card/60 border-border/50 ring-primary/5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl shadow-md ring-1 md:backdrop-blur-md">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
          <div className="bg-primary/10 ring-primary/20 rounded-full p-3 ring-1">
            <Wrench className="text-primary size-5" />
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed font-medium">
            Coming soon.
            <br />
            This feature is currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
