import type { StateCreator } from "zustand";
import { original } from "immer";
import type { Perk } from "@/features/entry-point/types";
import type { StoreState } from ".";
import { Perks } from "../config/perks";

export interface PerkTarget {
  perk: Perk;
  amount: number;
}

export interface BuilderSlice {
  builderTargets: Map<Perk, number>;

  addBuilderTarget: (perk: Perk) => void;
  removeBuilderTarget: (perk: Perk) => void;
  setBuilderTargetAmount: (perk: Perk, amount: number) => void;
  clearBuilderTargets: () => void;
}

export const createBuilderSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  BuilderSlice
> = (set): BuilderSlice => ({
  builderTargets: new Map([
    [Perks.BattlefieldMedicine, 5],
    [Perks.Conditioning, 10],
    [Perks.EquipmentSpecialist, 10],
    [Perks.DeepPockets, 20],
    [Perks.FastHands, 5],
    [Perks.QuickSwap, 7],
  ]),

  addBuilderTarget: (perk) =>
    set((state) => {
      state.builderTargets.set(perk, (state.builderTargets.get(perk) ?? 0) + 1);
    }),

  removeBuilderTarget: (perk) =>
    set((state) => {
      state.builderTargets.delete(perk);
    }),

  setBuilderTargetAmount: (perk, amount) =>
    set((state) => {
      state.builderTargets.set(perk, amount);
    }),

  clearBuilderTargets: () =>
    set((state) => {
      state.builderTargets = new Map();
    }),
});
