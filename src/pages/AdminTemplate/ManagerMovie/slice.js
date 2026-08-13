import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

// 1. Thunk lấy danh sách phim (hoặc tìm kiếm nếu có tenPhim)
export const fetchListMovie = createAsyncThunk(
  "listMovie/fetchListMovie",
  async (tenPhim = "", { rejectWithValue }) => {
    try {
      const url = tenPhim.trim()
        ? `QuanLyPhim/LayDanhSachPhim?maNhom=GP03&tenPhim=${encodeURIComponent(tenPhim.trim())}`
        : "QuanLyPhim/LayDanhSachPhim?maNhom=GP03";

      const result = await api.get(url);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Thunk thêm phim mới (Nhận formData trực tiếp từ Component)
export const addMovie = createAsyncThunk(
  "listMovie/addMovie",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const result = await api.post("QuanLyPhim/ThemPhimUploadHinh", formData);

      dispatch(fetchListMovie());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Thunk cập nhật thông tin phim (Nhận formData trực tiếp từ Component)
export const updateMovie = createAsyncThunk(
  "listMovie/updateMovie",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const result = await api.post("QuanLyPhim/CapNhatPhimUpload", formData);

      dispatch(fetchListMovie());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Thunk xóa phim
export const deleteMovie = createAsyncThunk(
  "listMovie/deleteMovie",
  async (maPhim, { dispatch, rejectWithValue }) => {
    try {
      const result = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);

      dispatch(fetchListMovie());
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ManagerMovieSlice = createSlice({
  name: "ManagerMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch / Search List Movie
      .addCase(fetchListMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchListMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Movie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Movie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ManagerMovieSlice.reducer;