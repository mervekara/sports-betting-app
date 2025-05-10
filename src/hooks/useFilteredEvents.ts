import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearSearchTerm, setSearchTerm } from "../redux/slices/searchSlice";
import type { Match } from "../types/match";

export const useFilteredEvents = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const odds = useAppSelector((state) => state.odds.data);
  const selectedSport = useAppSelector((state) => state.sports.selectedSport);

  const events: Match[] = useMemo(() => {
    if (!selectedSport) return [];
    return selectedSport ? odds[selectedSport.key] || [] : [];
  }, [selectedSport, odds]);

  const filteredEvents: Match[] = useMemo(() => {
    if (!searchTerm) return events;
    const lowerSearch = searchTerm.toLowerCase();
    return events.filter((event) =>
      `${event.home_team} ${event.away_team}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }, [events, searchTerm]);

  return {
    searchTerm,
    setSearchTerm: (val: string) => dispatch(setSearchTerm(val)),
    clearSearchTerm: () => dispatch(clearSearchTerm()),
    filteredEvents,
  };
};
