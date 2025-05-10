import { useAppDispatch } from "../../app/hooks";
import { toggleOutcome } from "../../redux/slices/cartSlice";
import { sendRemoveFromCartEvent } from "../../middleware/analyticsService";
import type { OutcomeInfo } from "../../types/cart";

interface OutcomeItemProps {
  outcome: OutcomeInfo;
}

const BetsBasketItem = ({ outcome }: OutcomeItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    await sendRemoveFromCartEvent(outcome.id, outcome.name, outcome.price);
    dispatch(toggleOutcome(outcome));
  };

  return (
    <li className="flex justify-between items-start p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-800">{outcome.name}</p>
        <p className="text-xs text-gray-500">
          {outcome.market} — {outcome.bookmaker}
        </p>
        <p className="text-sm text-gray-700">💸 {outcome.price}</p>
      </div>

      <button
        onClick={handleRemove}
        aria-label="Remove outcome"
        className="text-gray-400 hover:text-red-500 text-lg px-2 transition"
      >
        🗑️
      </button>
    </li>
  );
};

export default BetsBasketItem;
