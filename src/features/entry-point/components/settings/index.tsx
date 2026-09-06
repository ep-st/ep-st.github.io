import { DebugSettings } from "./debug-settings";
import { ExportSettings } from "./export";
import { PerkLimit } from "./perk-limit";
import { StarterClassSettings } from "./starter-class";

export function Settings() {
	return (
		<div className="fade-in slide-in-from-bottom-2 flex animate-in flex-col gap-1.5 duration-500">
			<StarterClassSettings />
			<PerkLimit />
			<ExportSettings />
			<DebugSettings />
		</div>
	);
}
