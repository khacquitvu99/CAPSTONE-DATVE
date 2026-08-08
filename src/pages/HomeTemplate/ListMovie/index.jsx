import { useState, useEffect } from "react";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listMovieReducer);

  /**
   * useEffect tự động chạy 1 lần duy nhất sau render => Nếu array rỗng
   */
  useEffect(() => {
    dispatch(fetchListMovie());
  }, []);

  const renderListMovie = () => {
    const { data } = state;
    return data?.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  if (state.loading) return <p>Loading...</p>;

return (
  <div className="container mx-auto">
    <h1>Danh sách phim đang chiếu</h1>
    <div className="grid grid-cols-3 gap-5">{renderListMovie()}</div>
  </div>
);
}
