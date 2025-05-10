import { useNavigate } from "react-router";
import { formatDate, formatTime } from "../../utils/date";
import type { Match } from "../../types/match";
import { sendMatchDetailEvent } from "../../middleware/analyticsService";

const MatchCard = ({ match }: { match: Match }) => {
  const navigate = useNavigate();

  const openDetailEvent = async () => {
    await sendMatchDetailEvent(match.id, match.home_team, match.away_team);

    navigate(`/event/${match.id}`);
  };

  return (
    <div
      onClick={openDetailEvent}
      className="border border-gray-200 rounded-xl p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-100"
    >
      <h3 className="text-base font-medium text-gray-800 mb-1">
        {match.home_team} <span className="text-gray-400">-</span>{" "}
        {match.away_team}
      </h3>
      <p className="text-sm text-gray-500">
        {formatDate(match.commence_time)} - {formatTime(match.commence_time)}
      </p>
    </div>
  );
};

export default MatchCard;
