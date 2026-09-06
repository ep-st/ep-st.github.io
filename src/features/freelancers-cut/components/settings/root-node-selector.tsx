import { GitBranch } from "lucide-react";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { RootNode } from "@/features/freelancers-cut/types";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export function RootNodeSelector() {
	const rootNode = useFreelancersCutStore((s) => s.rootNode);
	const setRootNode = useFreelancersCutStore((s) => s.setRootNode);

	const rootNodes = Object.entries(RootNode).map(([_, id]) => ({
		name: PERK_ENTRIES[id].perk.name,
		icon: PERK_ENTRIES[id].perk.icon,
		id,
	}));

	return (
		<Card className="overflow-hidden rounded-xl border-border/50 bg-card/60 shadow-md ring-1 ring-primary/5 transition-all hover:ring-primary/10 md:backdrop-blur-md">
			<CardContent className="px-4">
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<div className="rounded bg-primary/10 p-1">
							<GitBranch className="size-4 text-primary" />
						</div>
						<span className="font-bold text-[13px] text-foreground/90">
							Root Node
						</span>
					</div>

					<div className="grid grid-cols-2 gap-1.5">
						{rootNodes.map((node) => (
							<button
								type="button"
								key={node.id}
								onClick={() => setRootNode(node.id)}
								className={cn(
									"flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all",
									rootNode === node.id
										? "border-primary/30 bg-primary/10 ring-1 ring-primary/20"
										: "border-transparent bg-muted/30 hover:bg-muted/50",
								)}
							>
								<div
									className={cn(
										"flex size-8 shrink-0 items-center justify-center rounded-full",
										rootNode === node.id ? "bg-primary/20" : "bg-muted",
									)}
								>
									<img
										width="100%"
										height="100%"
										src={node.icon}
										alt={node.name}
										className={cn(
											"size-5 rounded-full",
											rootNode !== node.id && "opacity-50 grayscale",
										)}
									/>
								</div>
								<span
									className={cn(
										"flex-1 truncate font-bold text-[12px]",
										rootNode === node.id
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{node.name}
								</span>
							</button>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
