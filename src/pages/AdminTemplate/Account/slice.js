import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

// 1. Thunk lấy danh sách người dùng
export const fetchListUsers = createAsyncThunk(
  "listUsers/fetchListUsers",
  async (__, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyNguoiDung/LayThongTinNguoiDung");
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
      const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", userData);
      // Gọi lại danh sách người dùng sau khi thêm thành công
      dispatch(fetchListUsers());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Thunk cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  "listUsers/updateUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // Đảm bảo dữ liệu gửi lên có mã nhóm GP03
      const payload = { ...userData, maNhom: "GP03" };
      const result = await api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
      
      // Gọi lại danh sách mới sau khi thêm thành công
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
      const result = await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
      
      // Cập nhật lại danh sách sau khi xóa thành công
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
      // Fetch List User
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