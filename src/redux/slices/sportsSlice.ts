import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Sport, SportsState } from "../../types/sports";
import { fetchSportsAPI } from "../../services/sportsApi";
import { FETCH_SPORTS_ERROR } from "../../types/errors";

export const FetchStatus = {
  Idle: "idle",
  Loading: "loading",
  Succeeded: "succeeded",
  Failed: "failed",
} as const;

export type FetchStatus = (typeof FetchStatus)[keyof typeof FetchStatus];

const initialState: SportsState = {
  sports: [],
  selectedSport: null,
  status: FetchStatus.Idle,
  error: null,
};

export const fetchSports = createAsyncThunk<
  Sport[],
  void,
  { rejectValue: string }
>("sports/fetchSports", async (_, { rejectWithValue }) => {
  try {
    const sports = await fetchSportsAPI();

    if (!Array.isArray(sports)) {
      console.error("Unexpected response format from fetchSportsAPI");
      return rejectWithValue(FETCH_SPORTS_ERROR);
    }

    return sports;
  } catch (err: unknown) {
    console.error("fetchSports failed:", err);
    return rejectWithValue(FETCH_SPORTS_ERROR);
  }
});

const sportsSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    setSelectedSport: (state, action: PayloadAction<Sport | null>) => {
      state.selectedSport = action.payload;
    },
    resetSports: (state) => {
      state.sports = [];
      state.selectedSport = null;
      state.status = FetchStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSports.pending, (state) => {
        state.status = FetchStatus.Loading;
        state.error = null;
      })
      .addCase(fetchSports.fulfilled, (state, action) => {
        state.status = FetchStatus.Succeeded;
        state.sports = action.payload;
        state.error = null;
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.status = FetchStatus.Failed;
        state.error = action.payload ?? FETCH_SPORTS_ERROR;
      });
  },
});

export const { setSelectedSport, resetSports } = sportsSlice.actions;
export default sportsSlice.reducer;
