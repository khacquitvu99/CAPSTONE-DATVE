import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchListMovie = createAsyncThunk(
  "fetchListMovie",
  async (__, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP03");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const listMovieSlice = createSlice({
  name: "listMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
      state.data = null;
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
