import PerkLimit from "./perk-limit";
import RootNodeSelector from "./root-node-selector";
import ExportSettings from "./export";

export default function Settings() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-1.5 pb-10 duration-500">
      <RootNodeSelector />
      <PerkLimit />
      <ExportSettings />
    </div>
  );
}
