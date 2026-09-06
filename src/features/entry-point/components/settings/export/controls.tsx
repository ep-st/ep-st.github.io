import { cn } from "@/shared/lib/utils";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Eye, EyeOff, Image as ImageIcon, ImageOff } from "lucide-react";

export function ExportControls() {
  const showPreview = useEntryPointStore((s) => s.showPreview);
  const setShowPreview = useEntryPointStore((s) => s.setShowPreview);
  const withBackground = useEntryPointStore((s) => s.withBackground);
  const setWithBackground = useEntryPointStore((s) => s.setWithBackground);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className={cn(
          "border-border/50 bg-muted/30 rounded-md border p-1 transition-all",
          showPreview
            ? "text-primary hover:bg-muted/50"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
        title={showPreview ? "Hide Preview" : "Show Preview"}
      >
        {showPreview ? (
          <Eye className="size-3" />
        ) : (
          <EyeOff className="size-3" />
        )}
      </button>

      <div className="bg-muted/50 border-border/50 flex items-center gap-1 rounded-lg border p-0.5">
        <button
          onClick={() => setWithBackground(false)}
          className={cn(
            "rounded-md p-1 transition-all",
            !withBackground
              ? "bg-background text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          title="Transparent"
        >
          <ImageOff className="size-3" />
        </button>
        <button
          onClick={() => setWithBackground(true)}
          className={cn(
            "rounded-md p-1 transition-all",
            withBackground
              ? "bg-background text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          title="With Background"
        >
          <ImageIcon className="size-3" />
        </button>
      </div>
    </div>
  );
}
