import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("USER_LOGIN")) || null,
  error: null,
}

export const loginService = createAsyncThunk(
  "loginService",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyDangNhapQuanLyNguoiDung/DangNhap`, user);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const registerService = createAsyncThunk(
  "auth/registerService",
  async (userData, { rejectWithValue }) => {
    try {
      const payload = { ...userData, maNhom: "GP03" };
      const result = await api.post("QuanLyNguoiDung/DangKy", payload);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
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

    builder.addCase(registerService.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(registerService.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    builder.addCase(registerService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default AuthSlice.reducer;