import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getEventOdds } from "../../services/oddsAPI";
import type { Match } from "../../types/match";

export const FetchStatus = {
  Idle: "idle",
  Loading: "loading",
  Succeeded: "succeeded",
  Failed: "failed",
} as const;

export type FetchStatus = (typeof FetchStatus)[keyof typeof FetchStatus];

interface EventDetailState {
  data: Match | null;
  status: FetchStatus;
  error: string | null;
}

const initialState: EventDetailState = {
  data: null,
  status: FetchStatus.Idle,
  error: null,
};

export const fetchEventDetail = createAsyncThunk<
  Match,
  { sportKey: string; eventId: string },
  { rejectValue: string }
>(
  "eventDetail/fetchEventDetail",
  async ({ sportKey, eventId }, { rejectWithValue }) => {
    try {
      const data = await getEventOdds(sportKey, eventId);
      return data;
    } catch (err: unknown) {
      console.error("❌ Failed to fetch event detail:", err);
      return rejectWithValue("Failed to fetch event detail.");
    }
  }
);

const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState,
  reducers: {
    clearEventDetail(state) {
      state.data = null;
      state.status = FetchStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetail.pending, (state) => {
        state.status = FetchStatus.Loading;
        state.error = null;
      })
      .addCase(
        fetchEventDetail.fulfilled,
        (state, action: PayloadAction<Match>) => {
          state.status = FetchStatus.Succeeded;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchEventDetail.rejected, (state, action) => {
        state.status = FetchStatus.Failed;
        state.error = action.payload ?? "Unexpected error occurred";
      });
  },
});

export const { clearEventDetail } = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
