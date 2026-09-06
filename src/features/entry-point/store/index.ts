import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type BuilderSlice, createBuilderSlice } from "./builder-slice";
import {
	createPersistentSlice,
	type PersistentSlice,
} from "./persistent-slice";
import { createSelectionSlice, type SelectionSlice } from "./selection-slice";
import { createSettingsSlice, type SettingsSlice } from "./settings-slice";
import { createShareSlice, type ShareSlice } from "./share-slice";

export type StoreState = PersistentSlice &
	SelectionSlice &
	ShareSlice &
	BuilderSlice &
	SettingsSlice;

export const useEntryPointStore = create<StoreState>()(
	immer((...args) => ({
		...createPersistentSlice(...args),
		...createSelectionSlice(...args),
		...createShareSlice(...args),
		...createBuilderSlice(...args),
		...createSettingsSlice(...args),
	})),
);
