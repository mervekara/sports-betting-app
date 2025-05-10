import type { Sport } from "../types/sports";
import { get } from "./api";

export const fetchSportsAPI = async (): Promise<Sport[]> => {
  return get<Sport[]>("/sports");
};
