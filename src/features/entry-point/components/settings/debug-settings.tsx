import { useEntryPointStore } from "@/features/entry-point/store";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Bug } from "lucide-react";

export default function DebugSettings() {
  const showNodeIds = useEntryPointStore((s) => s.showNodeIds);
  const setShowNodeIds = useEntryPointStore((s) => s.setShowNodeIds);

  return (
    <Card className="bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 rounded-xl shadow-md">
      <CardHeader className="px-4 py-0 pb-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-secondary/10">
            <Bug className="size-4 text-primary" />
          </div>
          <span className="font-bold text-[14px] tracking-tight text-foreground">
            Debug
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <div className="flex items-center justify-between h-12">
          <span className="text-[13px] font-bold text-foreground/90">
            Show Node IDs
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showNodeIds}
            onClick={() => setShowNodeIds(!showNodeIds)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ${
              showNodeIds ? "bg-primary" : "bg-input"
            }`}
          >
            <span
              className={`pointer-events-none inline-block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200 ${
                showNodeIds ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
