import type { Bookmaker, Outcome } from "../../types/matchDetailsTypes";
import { createOutcomeId } from "../../utils/outcomeUtils";
import { OutcomeButton } from "../outCome/OutcomeButton";

type Props = {
  eventId: string;
  bookmaker: Bookmaker;
  marketKey: string;
  marketOutcomes: Outcome[];
  selectedOutcomes: { id: string }[];
  onToggle: (payload: {
    eventId: string;
    bookmakerKey: string;
    bookmakerTitle: string;
    marketKey: string;
    outcome: Outcome;
    matchName: string;
  }) => void;
  matchName: string;
};

export const BetCard = ({
  eventId,
  bookmaker,
  marketKey,
  marketOutcomes,
  selectedOutcomes,
  onToggle,
  matchName,
}: Props) => {
  const handleOutcomeClick = (outcome: Outcome) => {
    onToggle({
      eventId,
      bookmakerKey: bookmaker.key,
      bookmakerTitle: bookmaker.title,
      marketKey,
      outcome,
      matchName,
    });
  };

  const isSelected = (outcome: Outcome) => {
    const outcomeId = createOutcomeId(
      eventId,
      bookmaker.key,
      marketKey,
      outcome.name,
    );
    return selectedOutcomes.some((so) => so.id === outcomeId);
  };

  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50">
      <div className="text-sm font-medium text-gray-700 mb-2">
        {bookmaker.title}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {marketOutcomes.map((outcome, idx) => {
          return (
            <OutcomeButton
              key={idx}
              isSelected={isSelected(outcome)}
              onClick={() => handleOutcomeClick(outcome)}
              name={outcome.name}
              price={outcome.price}
            />
          );
        })}
      </div>
    </div>
  );
};
