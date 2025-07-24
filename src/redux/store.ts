import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import expressionOfInterest from "./slice/expression-of-interest/expressionInterestSlice";

const rootReducer = combineReducers({
  expressionOfInterest: expressionOfInterest,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
