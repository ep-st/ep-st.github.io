import { User } from "lucide-react";
import { classes } from "@/features/entry-point/config/perks/classes";
import { useEntryPointStore } from "@/features/entry-point/store";
import { StarterClass } from "@/features/entry-point/types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

const CLASS_TO_ENUM: Record<string, StarterClass> = {
	// biome-ignore lint/style/useNamingConvention: no
	Prodigy: StarterClass.Prodigy,
	"The Art of the Steal": StarterClass.TheArtOfTheSteal,
	"Combat Mastery": StarterClass.CombatMastery,
	"Demolitions Expert": StarterClass.DemolitionsExpert,
};

export function StarterClassSettings() {
	const starterClass = useEntryPointStore((s) => s.starterClass);
	const changeStarterClass = useEntryPointStore((s) => s.changeStarterClass);

	return (
		<Card className="overflow-hidden rounded-xl border-border/50 bg-card/60 shadow-lg ring-1 ring-primary/5 transition-all hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="px-4 py-0 pb-0">
				<div className="flex items-center gap-2">
					<div className="rounded bg-secondary/10 p-1">
						<User className="size-4 text-primary" />
					</div>
					<span className="font-bold text-[14px] text-foreground tracking-tight">
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
								type="button"
								key={cls.name}
								// biome-ignore lint/performance/noJsxPropsBind: it's fine
								onClick={() => changeStarterClass(enumValue)}
								className={cn(
									"group relative flex flex-col items-center gap-1.5 rounded-lg border-2 px-2 py-2 transition-all duration-500",
									isActive
										? "z-10 scale-[1.02] border-secondary bg-secondary/80 shadow-lg shadow-secondary/20"
										: "border-transparent bg-transparent opacity-40 grayscale hover:opacity-60",
								)}
							>
								<div
									className={cn(
										"relative size-9 overflow-hidden rounded-full shadow-sm transition-all duration-500",
										isActive
											? "scale-105 ring-2 ring-white/40 ring-offset-1 ring-offset-secondary/80"
											: "opacity-80",
									)}
								>
									<img
										width="100%"
										height="100%"
										src={cls.icon}
										alt={cls.name}
										className="size-full object-cover"
									/>
								</div>
								<span
									className={cn(
										"font-bold text-[12px] tracking-tight transition-colors",
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
