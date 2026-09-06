/** biome-ignore-all lint/performance/noJsxPropsBind: maybe some day */

import { Check, Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { initCache } from "@/features/entry-point/config/image-cache";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectExportUrl } from "@/features/entry-point/store/selectors/select-export-url";
import { selectUnlockedClassPerks } from "@/features/entry-point/store/selectors/select-perks";
import { Button } from "@/shared/components/ui/button";
import { copyImageToClipboard, downloadImage } from "./utils";

export function ExportActions() {
	const [copied, setCopied] = useState(false);
	const isCacheInitialized = useEntryPointStore((s) => s.isCacheInitialized);
	const setIsCacheInitialized = useEntryPointStore(
		(s) => s.setIsCacheInitialized,
	);

	const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
	const unlockedClassPerks = useEntryPointStore(selectUnlockedClassPerks);
	const exportUrl = useEntryPointStore(selectExportUrl);

	useEffect(() => {
		initCache().then(() => setIsCacheInitialized(true));
	}, [setIsCacheInitialized]);

	const handleExport = () => {
		downloadImage(exportUrl, unlockedClassPerks, unlockedNodes.size);
	};

	const handleCopy = async () => {
		const success = await copyImageToClipboard(exportUrl);
		if (success) {
			setCopied(true);

			// biome-ignore lint/style/noMagicNumbers: no
			setTimeout(() => setCopied(false), 2 * 1000);
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
