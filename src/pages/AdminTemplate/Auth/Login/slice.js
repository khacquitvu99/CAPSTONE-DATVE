import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("USER_LOGIN")) || null,
  error: null,
};

// Async Thunk đăng nhập
export const loginService = createAsyncThunk(
  "auth/loginService",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("QuanLyNguoiDung/DangNhap", user);
      const userInfo = result.data.content;

      // Kiểm tra quyền Quản Trị
      if (userInfo.maLoaiNguoiDung !== "QuanTri") {
        return rejectWithValue("Tài khoản của bạn không có quyền truy cập trang Quản Trị!");
      }

      return userInfo;
    } catch (error) {
      // Trả về thông báo lỗi chi tiết từ server
      const errorMsg =
        error.response?.data?.content ||
        error.response?.data ||
        "Tài khoản hoặc mật khẩu không chính xác!";
      return rejectWithValue(typeof errorMsg === "string" ? errorMsg : "Đăng nhập thất bại!");
    }
  }
);

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("accessToken");
    },
    clearError: (state) => {
      state.error = null;
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

        // Lưu thông tin người dùng & accessToken vào localStorage khi thành công
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

export const { logout, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;