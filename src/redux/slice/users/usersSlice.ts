import UsersService from "@/lib/api/coporate-registry/users/users";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkUserEmail = createAsyncThunk(
  "users/checkUserEmail",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await UsersService.CheckUserEmail(data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetUsers: (state) => {
      state.users = {};
    },
  },
});

export const { setUsers, resetUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
