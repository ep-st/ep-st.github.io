import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import Details from "./details";
import Settings from "./settings";
import Builder from "./builder";
import { LayoutGrid, Settings2, Wrench } from "lucide-react";

const TABS = [
  {
    value: "details",
    label: "Details",
    icon: LayoutGrid,
    component: Details,
  },
  {
    value: "builder",
    label: "Builder",
    icon: Wrench,
    component: Builder,
  },
  {
    value: "settings",
    label: "Settings",
    icon: Settings2,
    component: Settings,
  },
];

export default function Sidebar() {
  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <Tabs
        defaultValue="details"
        className="flex h-full min-h-0 w-full flex-1 flex-col gap-3"
      >
        <TabsList className="bg-muted/40 border-border/50 h-10 w-full shrink-0 gap-1 rounded-xl border p-1 shadow-inner md:backdrop-blur-md xl:h-12">
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-active:bg-primary data-active:text-primary-foreground rounded-lg text-sm font-bold transition-all duration-300 data-active:shadow-md"
            >
              <Icon className="mr-2 size-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map(({ value, component: Component }) => (
          <TabsContent
            key={value}
            value={value}
            className="min-h-0 flex-1 scrollbar-none overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="h-full">
              <Component />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
