import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSports, setSelectedSport } from "../redux/slices/sportsSlice";
import { fetchOddsBySport } from "../redux/slices/oddsSlice";

export const useFetchInitialData = () => {
  const dispatch = useAppDispatch();
  const { status, sports, selectedSport } = useAppSelector(
    (state) => state.sports
  );

  const oddsData = useAppSelector((state) => state.odds.data);

  useEffect(() => {
    if (status === "idle") dispatch(fetchSports());
  }, [dispatch, status]);

  useEffect(() => {
    const hasNoSelectedSport = !selectedSport;
    const hasSports = sports.length > 0;

    if (hasNoSelectedSport && hasSports) {
      const defaultSport = sports[0];
      dispatch(setSelectedSport(defaultSport));

      const oddsExist = Boolean(oddsData[defaultSport.key]);
      if (!oddsExist) {
        dispatch(fetchOddsBySport(defaultSport.key));
      }
    }
  }, [dispatch, selectedSport, sports, oddsData]);
};
