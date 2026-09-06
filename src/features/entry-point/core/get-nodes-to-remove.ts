import type { StarterClass } from "@/features/entry-point/types";
import { getInvalidNodes } from "./can-unlock-node";
import { EntryPointGraph } from "./graph";

export function getNodesToRemove(
	id: string,
	unlockedNodes: Set<string>,
	starterClass: StarterClass,
): Set<string> {
	const { getDisconnectedNodes } = EntryPointGraph;
	const nodesToLock = new Set<string>();
	const nextUnlockedNodes = new Set(unlockedNodes);
	const queue = [id];

	while (queue.length > 0) {
		// biome-ignore lint/style/noNonNullAssertion: Loop checks for the length of the queue
		const nodeId = queue.shift()!;
		if (nodesToLock.has(nodeId)) {
			continue;
		}

		const currentNodes = new Set(nextUnlockedNodes);
		nodesToLock.add(nodeId);
		nextUnlockedNodes.delete(nodeId);

		const disconnected = getDisconnectedNodes(
			currentNodes,
			nodeId,
			starterClass,
		);
		for (const d of disconnected) {
			queue.push(d);
		}

		const invalid = getInvalidNodes(nextUnlockedNodes);
		for (const i of invalid) {
			queue.push(i);
		}
	}

	return nodesToLock;
}
