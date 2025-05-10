import type { Sport } from "../../types/sports";
import { Accordion } from "../ui/Accordion";
import { SportsGroupItem } from "./SportsGroupItem";

interface Props {
  group: string;
  sports: Sport[];
  isOpen: boolean;
  onToggle: () => void;
  onSportClick: (group: string, sport: Sport) => void;
}

export const SportsGroupAccordion = ({
  group,
  sports,
  isOpen,
  onToggle,
  onSportClick,
}: Props) => {
  return (
    <Accordion label={group} isOpen={isOpen} onToggle={onToggle}>
      <ul className="pl-2 mt-2 space-y-1">
        {sports.map((sport) => (
          <SportsGroupItem
            key={sport.key}
            sport={sport}
            onClick={() => onSportClick(group, sport)}
          />
        ))}
      </ul>
    </Accordion>
  );
};
