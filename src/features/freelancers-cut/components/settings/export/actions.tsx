import { Check, Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { initCache } from "@/features/freelancers-cut/config/image-cache";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectExportUrl } from "@/features/freelancers-cut/store/selectors/select-export-url";
import { Button } from "@/shared/components/ui/button";
import { copyImageToClipboard, downloadImage } from "./utils";

export function ExportActions() {
	const [copied, setCopied] = useState(false);
	const isCacheInitialized = useFreelancersCutStore(
		(s) => s.isCacheInitialized,
	);
	const setIsCacheInitialized = useFreelancersCutStore(
		(s) => s.setIsCacheInitialized,
	);

	const unlockedNodes = useFreelancersCutStore((s) => s.unlockedNodes);
	const exportUrl = useFreelancersCutStore(selectExportUrl);

	useEffect(() => {
		initCache().then(() => setIsCacheInitialized(true));
	}, [setIsCacheInitialized]);

	const handleExport = () => {
		downloadImage(exportUrl, unlockedNodes.size);
	};

	const handleCopy = async () => {
		const success = await copyImageToClipboard(exportUrl);
		if (success) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			<Button
				variant="outline"
				size="sm"
				className="h-8 font-bold text-[11px] uppercase tracking-tight"
				onClick={handleExport}
				disabled={!isCacheInitialized}
			>
				<Download className="mr-1 size-3" />
				Save PNG
			</Button>
			<Button
				variant="outline"
				size="sm"
				className="h-8 font-bold text-[11px] uppercase tracking-tight"
				onClick={handleCopy}
				disabled={!isCacheInitialized}
			>
				{copied ? (
					<Check className="mr-1 size-3 text-green-500" />
				) : (
					<Copy className="mr-1 size-3" />
				)}
				{copied ? "Copied!" : "Copy"}
			</Button>
		</div>
	);
}
