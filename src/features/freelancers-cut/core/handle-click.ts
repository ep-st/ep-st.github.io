import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { canUnlockNode, getUnlockableNodes } from "./can-unlock-node";
import { getNodesToRemove } from "./get-nodes-to-remove";
import { FreelancersCutGraph } from "./graph";

export function handleClick(id: string) {
	const { isAdjacentToUnlocked } = FreelancersCutGraph;

	const {
		unlockedNodes,
		rootNode,
		unlockNode,
		unlockNodes,
		lockNodes,
		perkLimit,
	} = useFreelancersCutStore.getState();

	const isUnlocked = unlockedNodes.has(id);

	if (isUnlocked) {
		if (rootNode === id) {
			return;
		}

		const nodesToLock = getNodesToRemove(id, unlockedNodes, rootNode);
		lockNodes(Array.from(nodesToLock));
	} else if (isAdjacentToUnlocked(unlockedNodes, id)) {
		if (!canUnlockNode(unlockedNodes, perkLimit, id)) {
			return;
		}

		unlockNode(id);
	} else {
		const path = FreelancersCutGraph.pathToClosestUnlocked(
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
