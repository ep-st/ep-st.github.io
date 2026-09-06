import { createSelector } from "reselect";
import { renderTreeToCanvas } from "@/features/entry-point/components/settings/export/utils";
import { imageCache } from "@/features/entry-point/config/image-cache";
import type { StoreState } from "../index";

const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getWithBackground = (state: StoreState) => state.withBackground;
const getIsCacheInitialized = (state: StoreState) => state.isCacheInitialized;

export const selectExportUrl = createSelector(
	[getUnlockedNodes, getWithBackground, getIsCacheInitialized],
	(unlockedNodes, withBackground, isCacheInitialized) => {
		const canvas = document.createElement("canvas");

		if (!(isCacheInitialized && imageCache)) {
			return "";
		}

		renderTreeToCanvas(canvas, unlockedNodes, withBackground, imageCache);
		return canvas.toDataURL("image/png");
	},
);
