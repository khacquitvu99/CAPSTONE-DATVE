import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

// 1. Thunk lấy / tìm kiếm danh sách người dùng
export const fetchListUsers = createAsyncThunk(
  "listUsers/fetchListUsers",
  async (tuKhoa = "", { rejectWithValue }) => {
    try {
      const url = tuKhoa.trim()
        ? `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03&tuKhoa=${encodeURIComponent(tuKhoa.trim())}`
        : "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03";

      const result = await api.get(url);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Thunk thêm người dùng
export const addUser = createAsyncThunk(
  "listUsers/addUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const payload = { ...userData, maNhom: "GP03" };
      const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", payload);
      dispatch(fetchListUsers());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Thunk cập nhật thông tin người dùng (ĐÃ SỬA LỖI ĐOẠN NÀY)
export const updateUser = createAsyncThunk(
  "listUsers/updateUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const payload = { ...userData, maNhom: "GP03" };

      // Lấy accessToken từ LocalStorage nếu muốn log ra kiểm tra
      const userLogin = localStorage.getItem('USER_LOGIN') 
        ? JSON.parse(localStorage.getItem('USER_LOGIN')) 
        : null;
      console.log("Token check:", userLogin?.accessToken);

      // Gọi API (Lưu ý: API Cybersoft thường dùng POST hoặc PUT cho cập nhật)
      const result = await api.post(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        payload
      );

      dispatch(fetchListUsers());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Thunk xóa người dùng
export const deleteUser = createAsyncThunk(
  "listUsers/deleteUser",
  async (taiKhoan, { dispatch, rejectWithValue }) => {
    try {
      const result = await api.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      );

      dispatch(fetchListUsers());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ManagerAccSlice = createSlice({
  name: "ManagerAccSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch / Search List User
      .addCase(fetchListUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchListUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Account
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Account
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ManagerAccSlice.reducer;