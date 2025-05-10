import type { Sport } from "../../types/sports";
import { AccordionItem } from "../ui/AccordionItem";

interface Props {
  sport: Sport;
  onClick: () => void;
  onCloseSidebar?: () => void;
}

export const SportsGroupItem = ({ sport, onClick, onCloseSidebar }: Props) => {
  const handleClick = () => {
    onClick();

    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <AccordionItem onClick={handleClick} isActive={false}>
      {sport.title}
    </AccordionItem>
  );
};
