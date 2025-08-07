import AuthService from "@/lib/api/coporate-registry/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserSlice = createAsyncThunk(
  "auth/loginUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await AuthService.LoginUser(data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    resetAuth: (state) => {
      state.auth = {};
    },
  },
});

export const { setAuth, resetAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
