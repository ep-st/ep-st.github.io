import ClassDetails from "./class";
import MinorPerksDetails from "./minors";
import PerkCount from "./perk-count";
import UniquePerksDetails from "./uniques";
import WeaponMasteriesDetails from "./weapon-masteries";

export default function Details() {
  return (
    <div className="flex w-full flex-col items-start gap-3 p-1 lg:flex-row 2xl:gap-4">
      <div className="flex w-full flex-col gap-4 lg:w-7/10">
        <ClassDetails />
        <MinorPerksDetails />
        <WeaponMasteriesDetails />
      </div>

      <div className="flex w-full flex-1 flex-col gap-4">
        <PerkCount />
        <UniquePerksDetails />
      </div>
    </div>
  );
}
