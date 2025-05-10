import { useMemo, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedSport } from "../redux/slices/sportsSlice";
import { fetchOddsBySport } from "../redux/slices/oddsSlice";
import type { Sport } from "../types/sports";

type GroupedSports = Record<string, Sport[]>;

export const useGroupedSports = () => {
  const dispatch = useAppDispatch();

  const { sports, status, error } = useAppSelector((state) => state.sports);
  const odds = useAppSelector((state) => state.odds.data);

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const groupedSports: GroupedSports = useMemo(() => {
    if (!Array.isArray(sports) || sports.length === 0) return {};

    return sports.reduce<GroupedSports>((groups, sport) => {
      const groupName = sport.group || "Other";
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(sport);
      return groups;
    }, {});
  }, [sports]);

  const handleSportClick = useCallback(
    (group: string, sport: Sport) => {
      setOpenGroup((prev) => (prev === group ? null : group));
      dispatch(setSelectedSport(sport));

      if (sport.key && !odds?.[sport.key]) {
        dispatch(fetchOddsBySport(sport.key));
      }
    },
    [dispatch, odds]
  );

  return {
    groupedSports,
    status,
    error,
    openGroup,
    setOpenGroup,
    handleSportClick,
    isLoading: status === "loading",
    isError: Boolean(error),
    hasData: sports.length > 0,
  };
};
