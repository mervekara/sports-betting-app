import { Button } from "../ui/Button";

interface OutcomeButtonProps {
  isSelected: boolean;
  onClick: () => void;
  name: string;
  price: number;
}

export const OutcomeButton = ({
  isSelected,
  onClick,
  name,
  price,
}: OutcomeButtonProps) => (
  <Button
    variant={isSelected ? "primary" : "secondary"}
    className={`p-3 text-sm text-left ${
      isSelected
        ? "border-blue-600"
        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <div>{name}</div>
    <div className="text-base font-semibold">{price}</div>
  </Button>
);
