import { useEntryPointStore } from "@/features/entry-point/store";
import { canUnlockNode, getUnlockableNodes } from "./can-unlock-node";
import { getNodesToRemove } from "./get-nodes-to-remove";
import { EntryPointGraph } from "./graph";

export function handleClick(id: string) {
	const { isAdjacentToUnlocked } = EntryPointGraph;

	const {
		unlockedNodes,
		starterClass,
		unlockNode,
		unlockNodes,
		lockNodes,
		perkLimit,
	} = useEntryPointStore.getState();

	const isUnlocked = unlockedNodes.has(id);

	if (isUnlocked) {
		if (starterClass === id) {
			return;
		}

		const nodesToLock = getNodesToRemove(id, unlockedNodes, starterClass);
		lockNodes(Array.from(nodesToLock));
	} else if (isAdjacentToUnlocked(unlockedNodes, id)) {
		if (!canUnlockNode(unlockedNodes, perkLimit, id)) {
			return;
		}

		unlockNode(id);
	} else {
		const path = EntryPointGraph.pathToClosestUnlocked(
			id,
			unlockedNodes,
			perkLimit,
		);
		if (!path) {
			return;
		}

		const nodesToUnlock = getUnlockableNodes(unlockedNodes, perkLimit, path);
		unlockNodes(nodesToUnlock);
	}
}
