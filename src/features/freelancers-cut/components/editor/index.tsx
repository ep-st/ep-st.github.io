import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { CONNECTIONS } from "@/features/freelancers-cut/config/connections";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { ConnectionLine } from "./connection-line";
import { FilterDefs } from "./filter-defs";
import { PerkNode } from "./perk-node";

export function Editor() {
	return (
		<TransformWrapper
			initialPositionX={0}
			initialPositionY={0}
			centerOnInit={true}
			doubleClick={{ disabled: true }}
			maxScale={3}
			wheel={{ step: 0.001 }}
			pinch={{ step: 0.001 }}
			panning={{
				excluded: ["image"],
			}}
		>
			<TransformComponent
				wrapperStyle={{
					width: "100%",
					height: "100%",
				}}
				contentStyle={{
					width: "100%",
					height: "100%",
				}}
			>
				<svg
					aria-label="Tree"
					viewBox="0 -20 640 690"
					className="h-full w-full select-none"
					preserveAspectRatio="xMidYMid meet"
					width="100%"
					height="100%"
				>
					<FilterDefs />

					{...CONNECTIONS.map((entries) => (
						<ConnectionLine entries={entries} key={entries.join("-")} />
					))}
					{...Object.entries(PERK_ENTRIES).map(([id, perk]) => (
						<PerkNode perkEntry={perk} id={id} key={`Perk_${id}`} />
					))}
				</svg>
			</TransformComponent>
		</TransformWrapper>
	);
}
