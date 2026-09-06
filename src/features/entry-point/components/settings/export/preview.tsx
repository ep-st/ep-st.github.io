import { useEntryPointStore } from "@/features/entry-point/store";
import { selectExportUrl } from "@/features/entry-point/store/selectors/select-export-url";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { initCache } from "@/features/entry-point/config/image-cache";

export function ExportPreview() {
  const exportUrl = useEntryPointStore(selectExportUrl);
  const setIsCacheInitialized = useEntryPointStore(
    (s) => s.setIsCacheInitialized,
  );

  useEffect(() => {
    initCache().then(() => setIsCacheInitialized(true));
  }, [setIsCacheInitialized]);

  return (
    <div className="border-border/50 bg-muted/20 group/preview animate-in fade-in zoom-in-95 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border duration-200">
      {exportUrl ? (
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
