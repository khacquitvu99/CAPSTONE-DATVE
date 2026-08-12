import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("USER_LOGIN")) || null,
  error: null,
};

export const loginService = createAsyncThunk(
  "auth/loginService",
  async (user, { rejectWithValue }) => {
    try {
      
      const result = await api.post("QuanLyNguoiDung/DangNhap", user);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        // Lưu thông tin người dùng & accessToken vào localStorage
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload));
        if (action.payload.accessToken) {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
      })
      .addCase(loginService.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default AuthSlice.reducer;