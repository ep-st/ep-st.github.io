import { handleClick } from "@/features/entry-point/core/handle-click";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectSelectedNodes } from "@/features/entry-point/store/selectors/select-selected-nodes";
import type { PerkEntry } from "@/features/entry-point/types";

interface Props {
	perkEntry: PerkEntry;
	id: string;
}

export function PerkNode({ perkEntry, id }: Props) {
	const size = perkEntry.coordinates.z * 2;

	const isUnlocked = useEntryPointStore((store) => store.unlockedNodes.has(id));
	const isSelected = useEntryPointStore((store) =>
		selectSelectedNodes(store).has(id),
	);
	const setHoveredNode = useEntryPointStore((store) => store.setHoveredNode);
	const showNodeIds = useEntryPointStore((store) => store.showNodeIds);

	const filter = isSelected
		? "url(#selected)"
		: isUnlocked
			? "url(#unlocked)"
			: "url(#default)";

	return (
		<>
			{/* TODO: fix that vv */}
			{/** biome-ignore lint/a11y/noStaticElementInteractions: gotta fix that soon */}
			<image
				width={size}
				height={size}
				x={perkEntry.coordinates.x - size / 2}
				y={perkEntry.coordinates.y - size / 2}
				href={perkEntry.perk.icon}
				filter={filter}
				style={{ cursor: "pointer", pointerEvents: "auto" }}
				// TODO: make biome happy (optionally)
				// biome-ignore lint/performance/noJsxPropsBind: biome doesn't like it
				onClick={() => {
					handleClick(id);
				}}
				// biome-ignore lint/performance/noJsxPropsBind: biome doesn't like it
				onMouseEnter={() => {
					setHoveredNode(id);
				}}
				// biome-ignore lint/performance/noJsxPropsBind: biome doesn't like it
				onMouseLeave={() => {
					setHoveredNode(null);
				}}
			>
				<title>{perkEntry.perk.description}</title>
			</image>
			{showNodeIds && (
				<text
					x={perkEntry.coordinates.x}
					y={perkEntry.coordinates.y}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="red"
					//TODO: make this a constant somewhere vv
					// biome-ignore lint/style/noMagicNumbers: maybe
					fontSize={perkEntry.coordinates.z * 0.9}
					style={{ pointerEvents: "none" }}
				>
					{id}
				</text>
			)}
		</>
	);
}
