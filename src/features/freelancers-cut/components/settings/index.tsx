import { ExportSettings } from "./export";
import { PerkLimit } from "./perk-limit";
import { RootNodeSelector } from "./root-node-selector";

export function Settings() {
	return (
		<div className="fade-in slide-in-from-bottom-2 flex animate-in flex-col gap-1.5 pb-10 duration-500">
			<RootNodeSelector />
			<PerkLimit />
			<ExportSettings />
		</div>
	);
}
