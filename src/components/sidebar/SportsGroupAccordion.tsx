import type { Sport } from "../../types/sports";
import { Accordion } from "../ui/Accordion";
import { SportsGroupItem } from "./SportsGroupItem";

interface Props {
  group: string;
  sports: Sport[];
  isOpen: boolean;
  onToggle: () => void;
  onSportClick: (group: string, sport: Sport) => void;
  onCloseSidebar?: () => void;
}

export const SportsGroupAccordion = ({
  group,
  sports,
  isOpen,
  onToggle,
  onSportClick,
  onCloseSidebar,
}: Props) => {
  return (
    <Accordion label={group} isOpen={isOpen} onToggle={onToggle}>
      <ul className="pl-2 mt-2 space-y-1">
        {sports.map((sport) => (
          <SportsGroupItem
            key={sport.key}
            sport={sport}
            onClick={() => onSportClick(group, sport)}
            onCloseSidebar={onCloseSidebar}
          />
        ))}
      </ul>
    </Accordion>
  );
};
