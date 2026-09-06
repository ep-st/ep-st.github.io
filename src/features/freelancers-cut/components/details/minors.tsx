import { minors } from "@/features/freelancers-cut/config/perks/minors";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectUnlockedMinorsMap } from "@/features/freelancers-cut/store/selectors/select-perks";
import type { Perk } from "@/features/freelancers-cut/types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { cn } from "@/shared/lib/utils";

interface Props {
	perk: Perk;
}

function MinorPerkItem({ perk }: Props) {
	const count = useFreelancersCutStore(
		(store) => selectUnlockedMinorsMap(store).get(perk) ?? 0,
	);
	const isUnlocked = count > 0;

	return (
		<Item
			variant="outline"
			className={cn(
				"group relative w-full cursor-default overflow-hidden rounded-xl border-transparent px-3 py-2 transition-all duration-300",
				"bg-muted/20 hover:bg-muted/30",
				isUnlocked && [
					"border-secondary/10 bg-secondary/5 shadow-sm",
					"hover:border-secondary/30 hover:bg-secondary/10",
				],
			)}
		>
			<ItemContent className="flex w-full flex-row items-center gap-3">
				<div
					className={cn(
						"relative flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
						isUnlocked
							? "bg-secondary/20 shadow-[0_0_10px_rgba(var(--secondary-rgb),0.2)]"
							: "bg-muted/50 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0",
					)}
				>
					<img
						src={perk.icon}
						alt={perk.name}
						title={perk.description(Math.max(0, count))}
						width={18}
						height={18}
						className="z-10 rounded-full"
					/>
				</div>

				<ItemTitle
					className={cn(
						"flex-1 truncate font-bold text-[11px] leading-tight tracking-tight",
						isUnlocked ? "text-foreground" : "text-muted-foreground/60",
					)}
					title={perk.name}
				>
					{perk.name}
				</ItemTitle>

				<div className="flex w-5 shrink-0 justify-end">
					{count > 0 && (
						<span className="flex h-5 min-w-5 items-center justify-center rounded-lg bg-secondary px-1.5 font-black text-[10px] text-secondary-foreground tabular-nums shadow-sm">
							{count}
						</span>
					)}
				</div>
			</ItemContent>
		</Item>
	);
}

export function MinorPerksDetails() {
	const perks = Object.values(minors);

	return (
		<Card className="flex h-fit w-full shrink-0 flex-col gap-3 rounded-2xl border-border/50 bg-card/60 p-4 shadow-lg ring-1 ring-secondary/5 transition-all duration-300 hover:ring-secondary/10 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center gap-3 px-1 py-0">
				<div className="h-6 w-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary-rgb),0.3)]" />
				<span className="font-bold text-foreground/90 text-lg tracking-tight">
					Minor Perks
				</span>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				<div className="grid grid-cols-1 gap-2">
					{perks.map((perk) => (
						<MinorPerkItem key={perk.name} perk={perk} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
