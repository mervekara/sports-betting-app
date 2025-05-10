import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Match } from "../../types/match";
import { fetchMatchBySportAPI } from "../../services/matchAPI";
import { ODDS_FETCH_ERROR_PREFIX } from "../../types/errors";

export const FetchStatus = {
  Idle: "idle",
  Loading: "loading",
  Succeeded: "succeeded",
  Failed: "failed",
} as const;

export type FetchStatus = (typeof FetchStatus)[keyof typeof FetchStatus];

interface OddsState {
  data: Record<string, Match[]>;
  status: Record<string, FetchStatus>;
  error: Record<string, string | null>;
}

const initialState: OddsState = {
  data: {},
  status: {},
  error: {},
};

export const fetchOddsBySport = createAsyncThunk<
  { sportKey: string; matches: Match[] },
  string,
  { rejectValue: { sportKey: string; message: string } }
>("odds/fetchBySport", async (sportKey, { rejectWithValue }) => {
  try {
    const matches = await fetchMatchBySportAPI(sportKey);
    return { sportKey, matches };
  } catch (err: unknown) {
    console.error(`[${sportKey}] Odds fetch failed:`, err);

    return rejectWithValue({
      sportKey,
      message: `${ODDS_FETCH_ERROR_PREFIX} ${sportKey}`,
    });
  }
});

const oddsSlice = createSlice({
  name: "odds",
  initialState,
  reducers: {
    clearOdds: (state, action: PayloadAction<string>) => {
      const sportKey = action.payload;
      delete state.data[sportKey];
      delete state.status[sportKey];
      delete state.error[sportKey];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOddsBySport.pending, (state, action) => {
        const sportKey = action.meta.arg;
        state.status[sportKey] = FetchStatus.Loading;
        state.error[sportKey] = null;
      })
      .addCase(fetchOddsBySport.fulfilled, (state, action) => {
        const { sportKey, matches } = action.payload;
        state.data[sportKey] = matches;
        state.status[sportKey] = FetchStatus.Succeeded;
        state.error[sportKey] = null;
      })
      .addCase(fetchOddsBySport.rejected, (state, action) => {
        const payload = action.payload;

        if (payload) {
          const { sportKey, message } = payload as {
            sportKey: string;
            message: string;
          };
          state.status[sportKey] = FetchStatus.Failed;
          state.error[sportKey] =
            message ?? `${ODDS_FETCH_ERROR_PREFIX} ${sportKey}`;
        }
      });
  },
});

export const { clearOdds } = oddsSlice.actions;
export default oddsSlice.reducer;
