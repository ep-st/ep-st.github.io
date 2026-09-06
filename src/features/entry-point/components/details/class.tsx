import { Card, CardHeader } from "@/shared/components/ui/card";
import { getClassPerksTitle } from "@/features/entry-point/core/getClassPerksTitle";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectUnlockedClassPerks } from "@/features/entry-point/store/selectors";

export default function ClassDetails() {
  const classesUnlocked = useEntryPointStore(selectUnlockedClassPerks);

  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 flex w-full flex-col gap-4 rounded-2xl px-4 py-5 shadow-lg ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between px-1 py-0">
        <div className="flex flex-row items-center gap-4 select-none">
          <div className="bg-primary/60 h-6 w-1 rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
          <span className="text-foreground/90 text-xl font-bold tracking-tight">
            Class
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-3">
            {[...classesUnlocked].map((perk, i) => (
              <div key={perk.name} className="group relative">
                <img
                  src={perk.icon}
                  width={32}
                  title={perk.description}
                  height={32}
                  className="border-card bg-muted/80 relative z-10 rounded-full border-2 shadow-sm transition-transform group-hover:scale-110 hover:z-100"
                />
                <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <span className="text-primary/90 px-2 py-1 text-[16px] font-black">
            {getClassPerksTitle(classesUnlocked)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
