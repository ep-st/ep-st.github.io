import { Eye, EyeOff, Image as ImageIcon, ImageOff, List } from "lucide-react";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { cn } from "@/shared/lib/utils";

// TODO: fix excessive lines per function
// biome-ignore lint/complexity/noExcessiveLinesPerFunction: gonna fix it
export function ExportControls() {
	const showPreview = useFreelancersCutStore((s) => s.showPreview);
	const setShowPreview = useFreelancersCutStore((s) => s.setShowPreview);
	const withBackground = useFreelancersCutStore((s) => s.withBackground);
	const setWithBackground = useFreelancersCutStore((s) => s.setWithBackground);
	const withMajorPerks = useFreelancersCutStore((s) => s.withMajorPerks);
	const setWithMajorPerks = useFreelancersCutStore((s) => s.setWithMajorPerks);

	return (
		<div className="flex items-center gap-2">
			<button
				type="button"
				onClick={() => setShowPreview(!showPreview)}
				className={cn(
					"rounded-md border border-border/50 bg-muted/30 p-1 transition-all",
					showPreview
						? "text-primary hover:bg-muted/50"
						: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
				)}
				title={showPreview ? "Hide Preview" : "Show Preview"}
			>
				{showPreview ? (
					<Eye className="size-3" />
				) : (
					<EyeOff className="size-3" />
				)}
			</button>
			<button
				type="button"
				onClick={() => setWithMajorPerks(!withMajorPerks)}
				className={cn(
					"rounded-md border border-border/50 bg-muted/30 p-1 transition-all",
					withMajorPerks
						? "text-primary hover:bg-muted/50"
						: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
				)}
				title={withMajorPerks ? "Hide Major Perks" : "Show Major Perks"}
			>
				<List className="size-3" />
			</button>

			<div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/50 p-0.5">
				<button
					type="button"
					onClick={() => setWithBackground(false)}
					className={cn(
						"rounded-md p-1 transition-all",
						withBackground
							? "text-muted-foreground hover:text-foreground"
							: "bg-background text-primary shadow-sm",
					)}
					title="Transparent"
				>
					<ImageOff className="size-3" />
				</button>
				<button
					type="button"
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
