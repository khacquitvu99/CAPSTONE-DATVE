import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { data } from "react-router-dom"

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const loginService = createAsyncThunk(
  "loginService",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyDangNhapQuanLyNguoiDung/DangNhap`,user);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginService.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });

    builder.addCase(loginService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(loginService.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default AuthSlice.reducer;