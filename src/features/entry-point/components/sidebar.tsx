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
    <div className="mx-auto w-full h-full flex flex-col">
      <Tabs
        defaultValue="details"
        className="flex-1 flex flex-col gap-3 w-full h-full min-h-0"
      >
        <TabsList className="bg-muted/40 md:backdrop-blur-md gap-1 border-border/50 border w-full p-1 h-10 xl:h-12 rounded-xl shadow-inner shrink-0">
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-lg data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md transition-all duration-300 font-bold text-sm"
            >
              <Icon className="size-4 mr-2" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map(({ value, component: Component }) => (
          <TabsContent
            key={value}
            value={value}
            className="flex-1 outline-none overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-0"
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

