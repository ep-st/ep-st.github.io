import { Download } from "lucide-react";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ExportActions } from "./actions";
import { ExportControls } from "./controls";
import { ExportPreview } from "./preview";

export function ExportSettings() {
	const showPreview = useFreelancersCutStore((s) => s.showPreview);

	return (
		<Card className="overflow-hidden rounded-xl border-border/50 bg-card/60 py-4 shadow-md ring-1 ring-primary/5 transition-all hover:ring-primary/10 md:backdrop-blur-md">
			<CardContent className="px-4">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="rounded bg-primary/10 p-1">
								<Download className="size-4 text-primary" />
							</div>
							<span className="font-bold text-[13px] text-foreground/90">
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
