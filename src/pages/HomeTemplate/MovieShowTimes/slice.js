import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchShowTimes = createAsyncThunk(
  "fetchShowTimes",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03`);
      //const resultLichChieu
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const detailShowTimesSlice = createSlice({
  name: "detailShowTimesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowTimes.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchShowTimes.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchShowTimes.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});
export default detailShowTimesSlice.reducer;