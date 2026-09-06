import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectExportUrl } from "@/features/freelancers-cut/store/selectors/select-export-url";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { initCache } from "@/features/freelancers-cut/config/image-cache";

export function ExportPreview() {
  const exportUrl = useFreelancersCutStore(selectExportUrl);
  const isCacheInitialized = useFreelancersCutStore(
    (s) => s.isCacheInitialized,
  );
  const setIsCacheInitialized = useFreelancersCutStore(
    (s) => s.setIsCacheInitialized,
  );

  useEffect(() => {
    initCache().then(() => setIsCacheInitialized(true));
  }, [setIsCacheInitialized]);

  return (
    <div className="border-border/50 bg-muted/20 group/preview animate-in fade-in zoom-in-95 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border duration-200">
      {isCacheInitialized && exportUrl ? (
        <>
          <img
            src={exportUrl}
            alt="Tree Preview"
            className="h-full w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/preview:opacity-100">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              Preview
            </span>
          </div>
        </>
      ) : (
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <Loader2 className="size-6 animate-spin opacity-50" />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            Generating...
          </span>
        </div>
      )}
    </div>
  );
}
