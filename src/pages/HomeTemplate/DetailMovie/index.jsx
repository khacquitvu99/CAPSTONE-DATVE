import { useParams } from "react-router-dom";
import { fetchDetailMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DetailMovie() {
  const state = useSelector((state) => state.detailMovieReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, []);

  if (state.loading) return <p>Loading...</p>;

  const renderInfoMovie = () => {
    const { data } = state;
    if (data) {
      return (
        <div>
          <h1>Nội dung phim</h1>
          <img
            className="rounded-t-base"
            src={data.hinhAnh}
            alt={data.tenPhim}
          />
          <h1>Ten Phim: {data.tenPhim}</h1>
          <p>Bí danh: {data.biDanh}</p>
          <p><a href={data.trailer}></a></p>
          <p>Ngày khởi chiếu: {data.ngayKhoiChieu}</p>
          <p>Dánh giá: {data.danhGia}</p>
          <p>Mô tả: {data.moTa}</p>
          <p>
            <button className="text-red-500">Mua Vé</button>
            <button className="text-blue-500">Lịch Chiếu</button>
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      {renderInfoMovie()}
    </div>
  );
}
