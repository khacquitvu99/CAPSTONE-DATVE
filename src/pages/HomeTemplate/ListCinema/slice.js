import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchListCinema = createAsyncThunk(
  "fetchListCinema",
  async (__, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const listCinemaSlice = createSlice({
  name: "listCinemaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListCinema.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });

    builder.addCase(fetchListCinema.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(fetchListCinema.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default listCinemaSlice.reducer;
