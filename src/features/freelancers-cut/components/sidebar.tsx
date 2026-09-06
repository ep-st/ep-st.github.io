import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import Details from "./details";
import Settings from "./settings";
import { LayoutGrid, Settings2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <Tabs
        defaultValue="details"
        className="flex h-full min-h-0 w-full flex-1 flex-col gap-3"
      >
        <TabsList className="bg-muted/40 border-border/50 h-10 w-full shrink-0 gap-1 rounded-xl border p-1 shadow-inner md:backdrop-blur-md xl:h-12">
          <TabsTrigger
            key={"details"}
            value={"details"}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg text-sm font-bold transition-all duration-300 data-[state=active]:shadow-md"
          >
            <LayoutGrid className="mr-2 size-4" />
            Details
          </TabsTrigger>

          <TabsTrigger
            key={"settings"}
            value={"settings"}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg text-sm font-bold transition-all duration-300 data-[state=active]:shadow-md"
          >
            <Settings2 className="mr-2 size-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          key={"details"}
          value={"details"}
          className="min-h-0 flex-1 scrollbar-none overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="h-full">
            <Details />
          </div>
        </TabsContent>

        <TabsContent
          key={"settings"}
          value={"settings"}
          className="min-h-0 flex-1 scrollbar-none overflow-y-auto outline-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="h-full">
            <Settings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
