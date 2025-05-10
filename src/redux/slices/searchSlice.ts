import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "../../types/search";

type SearchTerm = string;

const initialState: SearchState = {
  searchTerm: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<SearchTerm>) => {
      const term = action.payload.trim();

      if (term.length < 1) {
        console.warn("Search term is too short, ignored");
        return;
      }

      state.searchTerm = term;
    },

    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
