import { Card, CardHeader } from "@/shared/components/ui/card";

export default function ClassPlaceholder() {
  return (
    <Card className="bg-card/60 border-border/50 ring-primary/5 hover:ring-primary/10 flex w-full flex-col gap-4 rounded-2xl px-4 py-4 shadow-lg ring-1 transition-all duration-300 md:backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between px-1 py-0">
        <div className="flex flex-row items-center gap-4 select-none">
          <div className="bg-primary/60 h-6 w-1 rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
          <span className="text-foreground/90 text-[18px] font-bold tracking-tight">
            Class
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-primary/90 px-2 py-1 text-[16px] font-black">
            Freelancer
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
