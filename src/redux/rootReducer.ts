import { combineReducers } from "@reduxjs/toolkit";
import sportsReducer from "./slices/sportsSlice";
import oddsReducer from "./slices/oddsSlice";
import eventDetailReducer from "./slices/eventDetailSlice";
import searchReducer from "./slices/searchSlice";
import cartSliceReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  sports: sportsReducer,
  odds: oddsReducer,
  eventDetail: eventDetailReducer,
  cart: cartSliceReducer,
  search: searchReducer,
});

export default rootReducer;
