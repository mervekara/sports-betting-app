import { useAppSelector } from "../../app/hooks";
import { MATCH_INFO } from "../../constants/details";
import { formatDate, formatTime } from "../../utils/date";

export const MatchInfoCard = () => {
  const { data } = useAppSelector((state) => state.eventDetail);

  return (
    <div className="bg-gray-50 rounded p-5 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{MATCH_INFO}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">League:</span> {data?.sport_title}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Date & Time:</span>{" "}
        {`${formatDate(data?.commence_time || "")} - ${formatTime(data?.commence_time || "")}`}
      </p>
    </div>
  );
};
