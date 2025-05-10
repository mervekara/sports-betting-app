import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CLEAR_ALL } from "../../constants/general.type";
import { clearOutcomes } from "../../redux/slices/cartSlice";

const BetsBasketTotalSummary = () => {
  const dispatch = useAppDispatch();
  const outcomes = useAppSelector((state) => state.cart.selectedOutcomes) || [];

  const handleClearAll = () => {
    dispatch(clearOutcomes());
  };

  const total = outcomes.reduce((sum, o) => sum + o.price, 0).toFixed(2);

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">🧾 Total: {total}</p>
          <p className="text-xs text-gray-500">
            🎯 {outcomes.length} outcome(s)
          </p>
        </div>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition"
        >
          {CLEAR_ALL}
        </button>
      </div>
    </div>
  );
};

export default BetsBasketTotalSummary;
