import MatchCard from "../cards/MatchCard";
import { EmptyState } from "../ui/EmptyState";
import type { Match } from "../../types/match";

type Props = {
  events: Match[];
};

const MatchList = ({ events }: Props) => {
  const validEvents = events.filter(
    (event) => event.home_team && event.away_team,
  );

  if (validEvents.length === 0) {
    return <EmptyState title={"No events found."} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
