import { create } from "zustand";
import {
  createPersistentSlice,
  type PersistentSlice,
} from "./persistent-slice";
import { immer } from "zustand/middleware/immer";
import { createSelectionSlice, type SelectionSlice } from "./selection-slice";
import { createShareSlice, type ShareSlice } from "./share-slice";
import { createBuilderSlice, type BuilderSlice } from "./builder-slice";
import { createSettingsSlice, type SettingsSlice } from "./settings-slice";

export type StoreState = PersistentSlice & SelectionSlice & ShareSlice & BuilderSlice & SettingsSlice;

export const useEntryPointStore = create<StoreState>()(
  immer((...args) => ({
    ...createPersistentSlice(...args),
    ...createSelectionSlice(...args),
    ...createShareSlice(...args),
    ...createBuilderSlice(...args),
    ...createSettingsSlice(...args),
  })),
);

