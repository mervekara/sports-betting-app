import { useAppSelector } from "../../app/hooks";
import { formatDate, formatTime } from "../../utils/date";

export const MatchBanner = () => {
  const { data } = useAppSelector((state) => state.eventDetail);
  const date = data ? new Date(data.commence_time) : new Date();
  const backgroundUrl = "/images/football_background.png";

  return (
    <div
      className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          {data
            ? `${data.home_team} - ${data.away_team}`
            : "Match details unavailable"}
        </h1>
        <p className="text-sm md:text-lg text-gray-200 mb-1">
          {formatDate(date.toISOString())}
        </p>
        <p className="text-sm md:text-lg text-gray-200">
          {formatTime(date.toISOString())}
        </p>
      </div>
    </div>
  );
};
