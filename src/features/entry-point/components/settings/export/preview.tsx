import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { initCache } from "@/features/entry-point/config/image-cache";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectExportUrl } from "@/features/entry-point/store/selectors/select-export-url";

export function ExportPreview() {
	const exportUrl = useEntryPointStore(selectExportUrl);
	const setIsCacheInitialized = useEntryPointStore(
		(s) => s.setIsCacheInitialized,
	);

	useEffect(() => {
		initCache().then(() => setIsCacheInitialized(true));
	}, [setIsCacheInitialized]);

	return (
		<div className="group/preview fade-in zoom-in-95 relative flex aspect-square w-full animate-in items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-muted/20 duration-200">
			{exportUrl ? (
				<>
					<img
						width="100%"
						height="100%"
						src={exportUrl}
						alt="Tree Preview"
						className="h-full w-full object-contain"
					/>
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/preview:opacity-100">
						<span className="font-bold text-[10px] text-white uppercase tracking-widest">
							Preview
						</span>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center gap-2 text-muted-foreground">
					<Loader2 className="size-6 animate-spin opacity-50" />
					<span className="font-bold text-[10px] uppercase tracking-widest">
						Generating...
					</span>
				</div>
			)}
		</div>
	);
}
