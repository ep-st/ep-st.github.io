import { CONNECTIONS } from "@/features/entry-point/config/connections";
import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import { Perks } from "@/features/entry-point/config/perks";
import { PerkType } from "@/features/entry-point/types";
import * as graph from "@/shared/graph";
import { withAdjacency } from "@/shared/withAdjacency";
import { canUnlockNode } from "./can-unlock-node";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export function isValidSet(unlocked: Set<string>): boolean {
	let classCount = 0;
	let masteryCount = 0;
	let hasCombatMastery = false;

	for (const id of unlocked) {
		const entry = PERK_ENTRIES[id];
		if (!entry) {
			continue;
		}
		if (entry.perk.perkType === PerkType.Class) {
			classCount++;
			if (entry.perk === Perks.CombatMastery) {
				hasCombatMastery = true;
			}
		} else if (entry.perk.perkType === PerkType.WeaponMastery) {
			masteryCount++;
		}
	}

	const masteryLimit = hasCombatMastery ? 2 : 1;
	return classCount <= 2 && masteryCount <= masteryLimit;
}

export namespace EntryPointGraph {
	export const shortestPath = withAdjacency(ADJACENCY_LIST, graph.shortestPath);
	export const reachableNodes = withAdjacency(
		ADJACENCY_LIST,
		graph.reachableNodes,
	);
	export const wouldDisconnect = withAdjacency(
		ADJACENCY_LIST,
		graph.wouldDisconnect,
	);
	export const isAdjacentToUnlocked = withAdjacency(
		ADJACENCY_LIST,
		graph.isAdjacentToUnlocked,
	);
	export const getDisconnectedNodes = withAdjacency(
		ADJACENCY_LIST,
		graph.getDisconnectedNodes,
	);

	export function pathToClosestUnlocked(
		nodeId: string,
		unlockedNodes: Set<string>,
		perkLimit: number,
	) {
		return graph.shortestValidPath(
			ADJACENCY_LIST,
			unlockedNodes,
			nodeId,
			(current, id) => canUnlockNode(current, perkLimit, id),
		);
	}
}
