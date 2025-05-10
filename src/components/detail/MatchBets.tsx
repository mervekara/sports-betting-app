import { useAppSelector } from "../../app/hooks";
import type { Bookmaker, Outcome } from "../../types/matchDetailsTypes";
import { BetCard } from "../cards/BetCard";

type Props = {
  selectedOutcomes: { id: string }[];
  onToggle: (payload: {
    eventId: string;
    bookmakerKey: string;
    bookmakerTitle: string;
    marketKey: string;
    outcome: Outcome;
  }) => void;
};

const formatMarketTitle = (key: string) =>
  key === "h2h" ? "Match Result" : key;

export const MatchBets = ({ selectedOutcomes, onToggle }: Props) => {
  const { data } = useAppSelector((state) => state.eventDetail);

  const markets: string[] = Array.from(
    new Set(
      data?.bookmakers.flatMap((bm: Bookmaker) => bm.markets.map((m) => m.key)),
    ),
  );

  const findMarket = (bookmaker: Bookmaker, marketKey: string) => {
    return bookmaker.markets.find((m) => m.key === marketKey);
  };

  return (
    <div className="max-h-[65vh] overflow-y-auto pr-1">
      {markets.map((marketKey) => (
        <div key={marketKey} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            {formatMarketTitle(marketKey)}
          </h2>

          <div className="space-y-4">
            {data?.bookmakers.map((bm: Bookmaker) => {
              const market = findMarket(bm, marketKey);
              if (!market) return null;

              return (
                <BetCard
                  key={`${data.id}-${bm.key}-${marketKey}`}
                  eventId={data.id}
                  bookmaker={bm}
                  marketKey={marketKey}
                  marketOutcomes={market.outcomes}
                  selectedOutcomes={selectedOutcomes}
                  onToggle={onToggle}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
