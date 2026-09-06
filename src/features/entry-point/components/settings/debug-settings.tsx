import { Bug } from "lucide-react";
import {
	type StoreState,
	useEntryPointStore,
} from "@/features/entry-point/store";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

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
			<span className="font-bold text-[13px] text-foreground/90">
				{option.label}
			</span>
			<button
				type="button"
				// biome-ignore lint/performance/noJsxPropsBind: It's insignificant
				onClick={() => setChecked(!checked)}
				className={cn(
					"relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
					checked ? "bg-primary" : "bg-input",
				)}
			>
				<span
					className={cn(
						"pointer-events-none inline-block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200",
						checked ? "translate-x-4" : "translate-x-0",
					)}
				/>
			</button>
		</div>
	);
}

export function DebugSettings() {
	return (
		<Card className="gap-0 overflow-hidden rounded-xl border-border/50 bg-card/60 py-3 shadow-md ring-1 ring-primary/5 transition-all hover:ring-primary/10 md:backdrop-blur-md">
			<CardContent className="flex flex-col px-4 py-0">
				<div className="flex h-8 items-center gap-2">
					<div className="rounded bg-secondary/10 p-1">
						<Bug className="size-4 text-primary" />
					</div>
					<span className="font-bold text-[13px] text-foreground/90">
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
