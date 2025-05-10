import { useAppSelector } from "../../app/hooks";
import type { OutcomeInfo } from "../../types/cart";
import BetsBasketItem from "../basket/BetsBasketItem";

const BetsBasketList = () => {
  const outcomes = useAppSelector((state) => state.cart.selectedOutcomes) || [];

  return (
    <ul className="overflow-y-auto space-y-2 pr-1 max-h-[300px] mt-3">
      {outcomes.map((outcome: OutcomeInfo) => (
        <BetsBasketItem key={outcome.id} outcome={outcome} />
      ))}
    </ul>
  );
};

export default BetsBasketList;
