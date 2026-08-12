import { useParams } from "react-router-dom";
import { fetchShowTimes } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ShowTimes() {
  const state = useSelector((state) => state.ShowTimesReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { idRap } = params;

  useEffect(() => {
    if (idRap) {
      dispatch(fetchShowTimes(idRap));
    }
  }, [idRap, dispatch]);

  if (state.loading) return <p>Loading...</p>;

  const renderShowTimes = () => {
    const { data } = state;

    // Kiểm tra và lấy mảng content (tùy thuộc vào slice của bạn lưu res.data hay res.data.content)
    const contentData = Array.isArray(data) ? data : data?.content;

    if (!contentData || contentData.length === 0) {
      return <p>Không có thông tin lịch chiếu.</p>;
    }

    // Bóc tách danh sách các suất chiếu từ mảng lồng nhau
    const danhSachLichChieu = contentData.flatMap((heThongRap) =>
      heThongRap.lstCumRap?.flatMap((cumRap) =>
        cumRap.danhSachPhim?.flatMap((phim) => phim.lstLichChieuTheoPhim || [])
      ) || []
    );

    if (danhSachLichChieu.length === 0) {
      return <p>Chưa có lịch chiếu cho phim này.</p>;
    }

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lịch Chiếu Phim</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {danhSachLichChieu.map((item) => (
            <div
              key={item.maLichChieu}
              className="border p-4 rounded-lg shadow bg-white text-gray-800"
            >
              <h2 className="text-lg font-bold text-blue-600">
                Tên Rạp: {item.tenRap} (Mã rạp: {item.maRap})
              </h2>
              <p className="mt-2">
                <strong>Ngày/Giờ chiếu:</strong>{" "}
                {new Date(item.ngayChieuGioChieu).toLocaleString("vi-VN")}
              </p>
              <p className="mt-1">
                <strong>Giá Vé:</strong>{" "}
                <span className="text-red-500 font-semibold">
                  {item.giaVe?.toLocaleString("vi-VN")} VNĐ
                </span>
              </p>
              <div className="mt-4 flex gap-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Mua Vé
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderShowTimes()}</div>;
}