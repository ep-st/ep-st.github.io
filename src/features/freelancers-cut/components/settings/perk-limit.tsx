import { Target } from "lucide-react";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export function PerkLimit() {
	const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
	const setPerkLimit = useFreelancersCutStore((s) => s.setPerkLimit);

	return (
		<Card className="overflow-hidden rounded-xl border-border/50 bg-card/60 shadow-md ring-1 ring-primary/5 transition-all hover:ring-primary/10 md:backdrop-blur-md">
			<CardContent className="px-4">
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="rounded bg-primary/10 p-1">
								<Target className="size-4 text-primary" />
							</div>
							<span className="font-bold text-[13px] text-foreground/90">
								Limit
							</span>
						</div>

						<div className="flex items-center gap-2">
							<span className="font-black text-primary text-xl tabular-nums leading-none">
								{perkLimit}
							</span>
							<div className="flex gap-1">
								{[50].map((val) => (
									<button
										type="button"
										key={val}
										onClick={() => setPerkLimit(val)}
										className={cn(
											"rounded border px-2 py-0.5 font-black text-[10px] transition-all",
											perkLimit === val
												? "border-primary bg-primary text-primary-foreground"
												: "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted",
										)}
									>
										{val}
									</button>
								))}
							</div>
						</div>
					</div>

					<input
						type="range"
						min="1"
						max="50"
						value={perkLimit}
						onChange={(e) => setPerkLimit(Number.parseInt(e.target.value, 10))}
						className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
