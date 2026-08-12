import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Cập nhật thunk nhận tham số tenPhim (mặc định là chuỗi rỗng)
export const fetchListMovie = createAsyncThunk(
  "fetchListMovie",
  async (tenPhim = "", { rejectWithValue }) => {
    try {
      // Nếu có truyền tenPhim thì nối thêm query param tenPhim vào URL
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

const listMovieSlice = createSlice({
  name: "listMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default listMovieSlice.reducer;