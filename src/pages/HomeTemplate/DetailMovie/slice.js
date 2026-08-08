import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchDetailMovie = createAsyncThunk(
  "fetchDetailMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
      //const resultLichChieu
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const detailMovieSlice = createSlice({
  name: "detailMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetailMovie.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchDetailMovie.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default detailMovieSlice.reducer;
