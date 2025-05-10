import type { Sport } from "../../types/sports";
import { AccordionItem } from "../ui/AccordionItem";

interface Props {
  sport: Sport;
  onClick: () => void;
}

export const SportsGroupItem = ({ sport, onClick }: Props) => {
  return (
    <AccordionItem onClick={onClick} isActive={false}>
      {sport.title}
    </AccordionItem>
  );
};
