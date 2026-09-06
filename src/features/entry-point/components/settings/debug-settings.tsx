import {
  useEntryPointStore,
  type StoreState,
} from "@/features/entry-point/store";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { Bug } from "lucide-react";

interface DebugOption {
  label: string;
  selectValue: (s: StoreState) => boolean;
  selectSetter: (s: StoreState) => (value: boolean) => void;
}

const DEBUG_OPTIONS: DebugOption[] = [
  {
    label: "Show Node IDs",
    selectValue: (s) => s.showNodeIds,
    selectSetter: (s) => s.setShowNodeIds,
  },
];

function DebugToggle({ option }: { option: DebugOption }) {
  const checked = useEntryPointStore(option.selectValue);
  const setChecked = useEntryPointStore(option.selectSetter);

  return (
    <div className="flex h-10 items-center justify-between">
      <span className="text-foreground/90 text-[13px] font-bold">
        {option.label}
      </span>
      <button
        type="button"
        role="switch"
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
          checked ? "bg-primary" : "bg-input",
        )}
      >
        <span
          className={cn(
            "bg-background pointer-events-none inline-block size-4 rounded-full shadow-sm ring-0 transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

export default function DebugSettings() {
  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 gap-0 overflow-hidden rounded-xl py-3 shadow-md ring-1 transition-all md:backdrop-blur-md">
      <CardContent className="flex flex-col px-4 py-0">
        <div className="flex h-8 items-center gap-2">
          <div className="bg-secondary/10 rounded p-1">
            <Bug className="text-primary size-4" />
          </div>
          <span className="text-foreground/90 text-[13px] font-bold">
            Debug
          </span>
        </div>

        {DEBUG_OPTIONS.map((option) => (
          <DebugToggle key={option.label} option={option} />
        ))}
      </CardContent>
    </Card>
  );
}
