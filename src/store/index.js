import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "./../pages/HomeTemplate/ListMovie/slice";
import detailMovieReducer from "../pages/HomeTemplate/DetailMovie/slice";
import listCinemaReducer from "./../pages/HomeTemplate/ListCinema/slice";
import ShowTimesReducer from "./../pages/HomeTemplate/MovieShowTimes/slice";
import detailCinemaReducer from "../pages/HomeTemplate/DetailCinema/slice";
import AuthSliceReducer from "../pages/AdminTemplate/Auth/slice";
import ManagerMovieReducer from "../pages/AdminTemplate/ManagerMovie/slice";
import ManagerAccReducer from "../pages/AdminTemplate/Account/slice";

export const store = configureStore({
  reducer: {
    
    listMovieReducer,
    detailMovieReducer,
    detailCinemaReducer,
    listCinemaReducer,
    ShowTimesReducer,
    AuthSliceReducer,
    ManagerMovieReducer,
    ManagerAccReducer,
  },
});
