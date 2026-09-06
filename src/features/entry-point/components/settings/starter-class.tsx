import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { classes } from "@/features/entry-point/config/perks/classes";
import { cn } from "@/shared/lib/utils";
import { useEntryPointStore } from "@/features/entry-point/store";
import { StarterClass } from "@/features/entry-point/types";
import { User } from "lucide-react";

const CLASS_TO_ENUM: Record<string, StarterClass> = {
  Prodigy: StarterClass.Prodigy,
  "The Art of the Steal": StarterClass.TheArtOfTheSteal,
  "Combat Mastery": StarterClass.CombatMastery,
  "Demolitions Expert": StarterClass.DemolitionsExpert,
};

export default function StarterClassSettings() {
  const starterClass = useEntryPointStore((s) => s.starterClass);
  const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 overflow-hidden rounded-xl shadow-lg ring-1 transition-all md:backdrop-blur-md">
      <CardHeader className="px-4 py-0 pb-0">
        <div className="flex items-center gap-2">
          <div className="bg-secondary/10 rounded p-1">
            <User className="text-primary size-4" />
          </div>
          <span className="text-foreground text-[14px] font-bold tracking-tight">
            Starter Class
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-1 pb-2">
        <div className="grid grid-cols-2 gap-2">
          {Object.values(classes).map((cls) => {
            const enumValue = CLASS_TO_ENUM[cls.name];
            const isActive = starterClass === enumValue;

            return (
              <button
                key={cls.name}
                onClick={() => changeStarterClass(enumValue)}
                className={cn(
                  "group relative flex flex-col items-center gap-1.5 rounded-lg border-2 px-2 py-2 transition-all duration-500",
                  isActive
                    ? "bg-secondary/80 border-secondary shadow-secondary/20 z-10 scale-[1.02] shadow-lg"
                    : "border-transparent bg-transparent opacity-40 grayscale hover:opacity-60",
                )}
              >
                <div
                  className={cn(
                    "relative size-9 overflow-hidden rounded-full shadow-sm transition-all duration-500",
                    isActive
                      ? "ring-offset-secondary/80 scale-105 ring-2 ring-white/40 ring-offset-1"
                      : "opacity-80",
                  )}
                >
                  <img
                    src={cls.icon}
                    alt={cls.name}
                    className="size-full object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "text-[12px] font-bold tracking-tight transition-colors",
                    isActive
                      ? "text-secondary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {cls.name}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
