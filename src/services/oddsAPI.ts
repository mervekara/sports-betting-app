import type { Match } from "../types/match";
import { get } from "./api";

export const getEventOdds = async (sportKey: string, eventId: string) => {
  return get<Match>(`/sports/${sportKey}/events/${eventId}/odds`, {
    params: {
      regions: "us",
    },
  });
};
