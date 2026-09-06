import { majors } from "@/features/freelancers-cut/config/perks/majors";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { selectUnlockedMajorsMap } from "@/features/freelancers-cut/store/selectors/select-perks";
import type { Perk } from "@/features/freelancers-cut/types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/shared/components/ui/item";
import { cn } from "@/shared/lib/utils";

interface Props {
	perk: Perk;
}

function MajorPerkItem({ perk }: Props) {
	const count = useFreelancersCutStore(
		(store) => selectUnlockedMajorsMap(store).get(perk) ?? 0,
	);
	const isUnlocked = count > 0;

	return (
		<Item
			variant="outline"
			className={cn(
				"group relative w-full cursor-default overflow-hidden rounded-xl border-transparent px-4 py-3 transition-all duration-300",
				"bg-muted/20 hover:bg-muted/30",
				isUnlocked && [
					"border-primary/10 bg-primary/5 shadow-sm",
					"hover:border-primary/30 hover:bg-primary/10",
				],
			)}
		>
			<ItemContent className="flex w-full flex-row items-center gap-3">
				<div
					className={cn(
						"relative flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-500",
						isUnlocked
							? "bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]"
							: "bg-muted/50 opacity-40 grayscale",
					)}
				>
					<img
						src={perk.icon}
						alt={perk.name}
						title={perk.description(Math.max(0, count - 1))}
						width={20}
						height={24}
						className="z-10 rounded-full"
					/>
				</div>

				<div className="flex min-w-0 flex-1 flex-col">
					<ItemTitle
						className={cn(
							"truncate font-bold text-[12px] leading-tight tracking-tight",
							isUnlocked ? "text-foreground" : "text-muted-foreground/60",
						)}
						title={perk.name}
					>
						{perk.name} {count}
					</ItemTitle>
					<div className="mt-1 flex gap-0.5">
						{[1, 2, 3].map((level) => (
							<div
								key={level}
								className={cn(
									"size-1.5 rounded-full transition-all duration-300",
									level <= count ? "bg-primary" : "bg-primary/10",
								)}
							/>
						))}
					</div>
				</div>
			</ItemContent>
		</Item>
	);
}

export function MajorPerksDetails() {
	const majorsMap = useFreelancersCutStore(selectUnlockedMajorsMap);
	const perks = Object.values(majors)
		// .filter((perk) => (majorsMap.get(perk) ?? 0) > 0)
		.sort((a, b) => {
			const countA = majorsMap.get(a) ?? 0;
			const countB = majorsMap.get(b) ?? 0;
			return countB - countA;
		});

	if (perks.length === 0) {
		return null;
	}

	return (
		<Card className="flex h-fit w-full shrink-0 flex-col gap-3 rounded-2xl border-border/50 bg-card/60 p-4 shadow-lg ring-1 ring-primary/5 transition-all duration-300 hover:ring-primary/10 md:backdrop-blur-md">
			<CardHeader className="flex select-none flex-row items-center gap-3 px-1 py-0">
				<div className="h-6 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
				<span className="font-bold text-foreground/90 text-lg tracking-tight">
					Major Perks
				</span>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				<div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
					{perks.map((perk) => (
						<MajorPerkItem key={perk.name} perk={perk} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
