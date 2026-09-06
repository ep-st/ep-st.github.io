import type { StateCreator } from "zustand";
import type { StoreState } from ".";

export interface SettingsSlice {
	showNodeIds: boolean;
	setShowNodeIds: (value: boolean) => void;
}

export const createSettingsSlice: StateCreator<
	StoreState,
	[["zustand/immer", never]],
	[],
	SettingsSlice
> = (set): SettingsSlice => ({
	showNodeIds: false,

	setShowNodeIds: (value) =>
		set((state) => {
			state.showNodeIds = value;
		}),
});
