import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import {
	EDITOR_LOCKED_PATH_WIDTH,
	EDITOR_UNLOCKED_PATH_WIDTH,
} from "@/features/entry-point/constants";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectSelectedNodes } from "@/features/entry-point/store/selectors/select-selected-nodes";

interface Props {
	entries: [string, string];
}

export function ConnectionLine({ entries }: Props) {
	const [id1, id2] = entries;

	const isPathUnlocked = useEntryPointStore(
		(s) => s.unlockedNodes.has(id1) && s.unlockedNodes.has(id2),
	);

	const isPathSelected = useEntryPointStore((s) => {
		const selectedNodes = selectSelectedNodes(s);
		return (
			(selectedNodes.has(id1) && selectedNodes.has(id2)) ||
			(selectedNodes.has(id1) && s.unlockedNodes.has(id2)) ||
			(selectedNodes.has(id2) && s.unlockedNodes.has(id1))
		);
	});

	// biome-ignore lint/style/noNonNullAssertion: It is present
	const perk1 = PERK_ENTRIES[id1]!;
	// biome-ignore lint/style/noNonNullAssertion: It is present
	const perk2 = PERK_ENTRIES[id2]!;

	const stroke = isPathSelected ? "red" : isPathUnlocked ? "white" : "#ddd";

	return (
		<line
			x1={perk1.coordinates.x}
			y1={perk1.coordinates.y}
			x2={perk2.coordinates.x}
			y2={perk2.coordinates.y}
			stroke={stroke}
			strokeWidth={
				isPathUnlocked || isPathSelected
					? EDITOR_UNLOCKED_PATH_WIDTH
					: EDITOR_LOCKED_PATH_WIDTH
			}
		/>
	);
}
