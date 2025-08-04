import CSPExpressionOfInterestService from "@/lib/api/coporate-registry/csp-details/csp-details";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitCSPExpressionOfInterest = createAsyncThunk(
  "corporateServiceProvider/submitCorporateEOI",
  async (data: any, { rejectWithValue }) => {
    try {
      const response =
        await CSPExpressionOfInterestService.SubmitCSPExpressionOfInterest(
          data
        );

      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const uploadCSPDetails = createAsyncThunk(
  "corporateServiceProvider/uploadCSPDetails",
  async (
    { id, fileData }: { id: string; fileData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await CSPExpressionOfInterestService.uploadCSPDetails(
        id,
        fileData
      );
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const ExpressionOfInterestSlice = createSlice({
  name: "corporateServiceProvider",
  initialState: {
    corporateServiceProviderInfo: {},
  },
  reducers: {
    setcorporateServiceProviderInfo: (state, action) => {
      state.corporateServiceProviderInfo = action.payload;
    },
    resetcorporateServiceProviderInfo: (state) => {
      state.corporateServiceProviderInfo = {};
    },
  },
});

export const {
  setcorporateServiceProviderInfo,
  resetcorporateServiceProviderInfo,
} = ExpressionOfInterestSlice.actions;

export default ExpressionOfInterestSlice.reducer;
