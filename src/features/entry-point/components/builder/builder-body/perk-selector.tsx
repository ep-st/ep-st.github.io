import { useMemo, useState } from "react";
import type { Perk } from "@/features/entry-point/types";
import { PerkType } from "@/features/entry-point/types";
import { useEntryPointStore } from "@/features/entry-point/store";
import { PERK_ENTRIES } from "@/features/entry-point/config/entries";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
} from "@/shared/components/ui/combobox";

const maxCounts = new Map<string, number>();
for (const entry of Object.values(PERK_ENTRIES)) {
  maxCounts.set(entry.perk.name, (maxCounts.get(entry.perk.name) ?? 0) + 1);
}

const PERK_TYPE_LABELS: Record<PerkType, string> = {
  [PerkType.Class]: "Class",
  [PerkType.Unique]: "Unique",
  [PerkType.WeaponMastery]: "Weapon Mastery",
  [PerkType.Minor]: "Minor",
};

const PERK_TYPE_ORDER: PerkType[] = [
  PerkType.Minor,
  PerkType.Unique,
  PerkType.Class,
  PerkType.WeaponMastery,
];

export function PerkSelector() {
  const targets = useEntryPointStore((s) => s.builderTargets);
  const addBuilderTarget = useEntryPointStore((s) => s.addBuilderTarget);

  const [resetKey, setResetKey] = useState(0);

  const [search, setSearch] = useState("");

  const allUniquePerks = useMemo(() => {
    const list: Perk[] = [];
    const seen = new Set<string>();
    for (const entry of Object.values(PERK_ENTRIES)) {
      if (!seen.has(entry.perk.name)) {
        seen.add(entry.perk.name);
        list.push(entry.perk);
      }
    }
    return list;
  }, []);

  const addablePerks = useMemo(
    () => allUniquePerks.filter((p) => !targets.has(p)),
    [allUniquePerks, targets],
  );

  const grouped = useMemo(
    () =>
      PERK_TYPE_ORDER.map((type) => ({
        type,
        label: PERK_TYPE_LABELS[type],
        perks: addablePerks
          .filter((p) => p.perkType === type)
          .sort((a, b) => a.name.localeCompare(b.name)),
      })).filter((g) => g.perks.length > 0),
    [addablePerks],
  );

  const filteredGrouped = useMemo(() => {
    if (!search) return grouped;
    const lower = search.toLowerCase();
    return grouped
      .map((g) => ({
        ...g,
        perks: g.perks.filter((p) => p.name.toLowerCase().includes(lower)),
      }))
      .filter((g) => g.perks.length > 0);
  }, [grouped, search]);

  const handleValueChange = (perkName: string | null) => {
    if (!perkName) return;
    const perk = allUniquePerks.find((p) => p.name === perkName);
    if (perk) {
      addBuilderTarget(perk);
      setResetKey((k) => k + 1);
      setSearch(""); // clear search after selection
    }
  };

  return (
    <div className="shrink-0">
      <Combobox
        key={resetKey}
        onValueChange={handleValueChange}
        disabled={addablePerks.length === 0}
      >
        <ComboboxInput
          placeholder={
            addablePerks.length === 0 ? "All perks added" : "Choose a perk…"
          }
          className="w-full text-[13px] [&_input]:px-3.5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ComboboxContent>
          <ComboboxList>
            {filteredGrouped.length === 0 && (
              <ComboboxEmpty>No perks found.</ComboboxEmpty>
            )}
            {filteredGrouped.map(({ type, label, perks }) => (
              <ComboboxGroup key={type}>
                <ComboboxLabel>{label}</ComboboxLabel>
                {perks.map((perk) => (
                  <ComboboxItem key={perk.name} value={perk.name}>
                    <img
                      src={perk.icon}
                      alt=""
                      className="size-4 shrink-0 object-contain"
                    />
                    {perk.name}
                    <span className="ml-auto text-[11px] text-muted-foreground">
                      ×{maxCounts.get(perk.name)}
                    </span>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
