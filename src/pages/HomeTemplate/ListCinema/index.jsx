import { useState, useEffect } from "react";
import Cinema from "./Cinema";
import {fetchListCinema} from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ShowTimesListCinema() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listCinemaReducer);

  /**
   * useEffect tự động chạy 1 lần duy nhất sau render => Nếu array rỗng
   */
  useEffect(() => {
    dispatch(fetchListCinema());
  }, []);

  const renderListCinema = () => {
    const { data } = state;
    return data?.map((cinema) => <Cinema key={cinema.maHeThongRap} cinema={cinema} />);
  };

  if (state.loading) return <p>Loading...</p>;

return (
  <div className="container mx-auto">
    <h1>Danh sách rạp chiếu</h1>
    <div className="grid grid-cols-3 gap-5">{renderListCinema()}</div>
  </div>
);
}
