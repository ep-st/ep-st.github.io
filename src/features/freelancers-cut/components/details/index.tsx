import MajorPerksDetails from "./majors";
import MinorPerksDetails from "./minors";
import PerkCount from "./perk-count";
import ClassPlaceholder from "./class-placeholder";

export default function Details() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-1">
      <div className="flex w-full flex-col items-start gap-3 lg:flex-row 2xl:gap-4">
        <div className="flex w-full flex-col gap-4 lg:w-7/11">
          <ClassPlaceholder />
          <MajorPerksDetails />
        </div>

        <div className="flex w-full flex-1 flex-col gap-4">
          <PerkCount />
          <MinorPerksDetails />
        </div>
      </div>
    </div>
  );
}
