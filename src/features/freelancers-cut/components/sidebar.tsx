import { LayoutGrid, Settings2 } from "lucide-react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Details } from "./details";
import { Settings } from "./settings";

export function Sidebar() {
	return (
		<div className="mx-auto flex h-full w-full flex-col">
			<Tabs
				defaultValue="details"
				className="flex h-full min-h-0 w-full flex-1 flex-col gap-3"
			>
				<TabsList className="h-10 w-full shrink-0 gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 shadow-inner md:backdrop-blur-md xl:h-12">
					<TabsTrigger
						key="details"
						value="details"
						className="rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
					>
						<LayoutGrid className="mr-2 size-4" />
						Details
					</TabsTrigger>

					<TabsTrigger
						key="settings"
						value="settings"
						className="rounded-lg font-bold text-sm transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
					>
						<Settings2 className="mr-2 size-4" />
						Settings
					</TabsTrigger>
				</TabsList>

				<TabsContent
					key="details"
					value="details"
					className="scrollbar-none min-h-0 flex-1 overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
				>
					<div className="h-full">
						<Details />
					</div>
				</TabsContent>

				<TabsContent
					key="settings"
					value="settings"
					className="scrollbar-none min-h-0 flex-1 overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
				>
					<div className="h-full">
						<Settings />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
