import ExpressionOfInterestService from "@/lib/api/expression-of-interests/expression-of-interests";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitExpressionOfInterest = createAsyncThunk(
  "expressionOfInterest/submitExpressionOfInterest",
  async (data: any, { rejectWithValue }) => {
    try {
      const response =
        await ExpressionOfInterestService.SubmitExpressionOfInterest(data);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const ExpressionOfInterestSlice = createSlice({
  name: "epxressionOfInterest",
  initialState: {
    expressionOfInterestInfo: {},
  },
  reducers: {
    setExpressionOfInterestInfo: (state, action) => {
      state.expressionOfInterestInfo = action.payload;
    },
    resetExpressionOfInterestInfo: (state) => {
      state.expressionOfInterestInfo = {};
    },
  },
});

export const { setExpressionOfInterestInfo, resetExpressionOfInterestInfo } =
  ExpressionOfInterestSlice.actions;

export default ExpressionOfInterestSlice.reducer;
