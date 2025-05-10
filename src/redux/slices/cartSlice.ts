import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OutcomeInfo } from "../../types/cart";

interface CartState {
  selectedOutcomes: OutcomeInfo[];
}

const initialState: CartState = {
  selectedOutcomes: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleOutcome: (state, action: PayloadAction<OutcomeInfo>) => {
      const newOutcome = action.payload;
      const existingIndex = state.selectedOutcomes.findIndex(
        (item) => item.eventId === newOutcome.eventId,
      );

      if (
        existingIndex !== -1 &&
        state.selectedOutcomes[existingIndex].id === newOutcome.id
      ) {
        state.selectedOutcomes.splice(existingIndex, 1);
      } else if (existingIndex !== -1) {
        state.selectedOutcomes[existingIndex] = newOutcome;
      } else {
        state.selectedOutcomes.push(newOutcome);
      }
    },

    clearOutcomes: (state) => {
      state.selectedOutcomes = [];
    },
  },
});

export const { toggleOutcome, clearOutcomes } = cartSlice.actions;
export default cartSlice.reducer;
