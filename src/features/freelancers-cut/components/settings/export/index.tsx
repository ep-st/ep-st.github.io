import { Card, CardContent } from "@/shared/components/ui/card";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { Download } from "lucide-react";
import { ExportControls } from "./controls";
import { ExportPreview } from "./preview";
import { ExportActions } from "./actions";

export default function ExportSettings() {
  const showPreview = useFreelancersCutStore((s) => s.showPreview);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 overflow-hidden rounded-xl py-4 shadow-md ring-1 transition-all md:backdrop-blur-md">
      <CardContent className="px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded p-1">
                <Download className="text-primary size-4" />
              </div>
              <span className="text-foreground/90 text-[13px] font-bold">
                Export
              </span>
            </div>

            <ExportControls />
          </div>

          {showPreview && <ExportPreview />}

          <ExportActions />
        </div>
      </CardContent>
    </Card>
  );
}
