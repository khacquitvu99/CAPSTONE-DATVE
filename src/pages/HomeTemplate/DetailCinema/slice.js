import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchDetailCinema = createAsyncThunk(
  "fetchDetailCinema",
  async (idcinema, { rejectWithValue }) => {
    try {
      const result = await api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idcinema}`);
      
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const detailCinemaSlice = createSlice({
  name: "detailCinemaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetailCinema.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchDetailCinema.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchDetailCinema.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});
export default detailCinemaSlice.reducer;