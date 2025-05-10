import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { MatchBanner } from "../banners/MatchBanner";
import { MatchBets } from "./MatchBets";
import { MatchInfoCard } from "./MatchInfoCard";
import { toggleOutcome } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Tabs } from "../layout/Tabs";
import {
  clearEventDetail,
  fetchEventDetail,
} from "../../redux/slices/eventDetailSlice";
import { Loader } from "../ui/Loader";
import { EmptyState } from "../ui/EmptyState";
import { BACK } from "../../constants/details";
import { createOutcomeId } from "../../utils/outcomeUtils";
import { sendAddToCartEvent } from "../../middleware/analyticsService";

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const allOdds = useAppSelector((state) => state.odds.data);
  const selectedOutcome = useAppSelector(
    (state) => state.cart.selectedOutcomes
  );
  const { data, status } = useAppSelector((state) => state.eventDetail);

  const [selectedTab, setSelectedTab] = useState<"Odds" | "Info">("Odds");

  const event = useMemo(() => {
    return Object.values(allOdds)
      .flat()
      .find((e) => e.id === id);
  }, [allOdds, id]);

  const sportKey = event?.sport_key;

  useEffect(() => {
    if (!id || !sportKey) return;
    dispatch(fetchEventDetail({ sportKey, eventId: id }));
    return () => {
      dispatch(clearEventDetail());
    };
  }, [dispatch, id, sportKey]);

  if (status === "loading") {
    return <Loader />;
  }

  const handleToggle = async (payload: {
    eventId: string;
    bookmakerKey: string;
    marketKey: string;
    outcome: { name: string; price: number };
    bookmakerTitle: string;
  }) => {
    {
      const outcomeId = createOutcomeId(
        payload.eventId,
        payload.bookmakerKey,
        payload.marketKey,
        payload.outcome.name
      );

      await sendAddToCartEvent(
        outcomeId,
        payload.outcome.name,
        payload.outcome.price
      );

      dispatch(
        toggleOutcome({
          id: outcomeId,
          name: payload.outcome.name,
          price: payload.outcome.price,
          bookmaker: payload.bookmakerTitle,
          market: payload.marketKey,
          eventId: payload.eventId,
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {data && <MatchBanner />}

      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-4">
        <Link
          to="/"
          className="text-blue-600 text-sm underline mb-4 inline-block"
        >
          {BACK}
        </Link>
        {!data ? (
          <EmptyState
            title="No Event Data"
            description="Please check back later."
          />
        ) : (
          <>
            <Tabs selectedTab={selectedTab} onSelect={setSelectedTab} />
            {selectedTab === "Odds" ? (
              <MatchBets
                selectedOutcomes={selectedOutcome}
                onToggle={(payload) => handleToggle(payload)}
              />
            ) : (
              <MatchInfoCard />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
