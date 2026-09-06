import ExportSettings from "./export";
import PerkLimit from "./perk-limit";
import StarterClassSettings from "./starter-class";
import DebugSettings from "./debug-settings";

export default function Settings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-1.5 duration-500">
      <StarterClassSettings />
      <PerkLimit />
      <ExportSettings />
      <DebugSettings />
    </div>
  );
}
