import type { Match } from "../types/match";
import { get } from "./api";

export const fetchMatchBySportAPI = async (
  sportKey: string,
): Promise<Match[]> => {
  return get<Match[]>(`/sports/${sportKey}/events`);
};
