import { CLOSE } from "../../constants/general.type";

interface BetSlipHeaderProps {
  onClose: () => void;
}

const BetSlipHeader = ({ onClose }: BetSlipHeaderProps) => {
  return (
    <div className="mb-2 relative">
      <h3 className="text-base font-semibold text-gray-800">Bet Slip</h3>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-sm text-gray-500 hover:text-gray-800"
      >
        {CLOSE}
      </button>
    </div>
  );
};

export default BetSlipHeader;
