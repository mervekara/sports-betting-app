import { useGroupedSports } from "../../hooks/useGroupedSports";
import { SportsGroupAccordion } from "./SportsGroupAccordion";

export const SportsSidebar = () => {
  const { groupedSports, openGroup, setOpenGroup, handleSportClick } =
    useGroupedSports();

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sports</h2>

      <div className="space-y-3">
        {Object.entries(groupedSports).map(([group, sports]) => (
          <SportsGroupAccordion
            key={group}
            group={group}
            sports={sports}
            isOpen={openGroup === group}
            onToggle={() =>
              setOpenGroup((prev) => (prev === group ? null : group))
            }
            onSportClick={handleSportClick}
          />
        ))}
      </div>
    </>
  );
};
