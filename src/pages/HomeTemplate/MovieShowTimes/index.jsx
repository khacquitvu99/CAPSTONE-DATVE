import { useParams, Link } from "react-router-dom";
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

  // Skeleton Loading tối màu
  if (state.loading) {
    return (
      <div className="bg-slate-950 min-h-screen py-10 px-4 text-slate-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-8 w-64 bg-slate-800/80 rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-48 bg-slate-900 border border-slate-800/80 rounded-2xl animate-pulse p-5"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderShowTimes = () => {
    const { data } = state;
    const contentData = Array.isArray(data) ? data : data?.content;

    if (!contentData || contentData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium">Không tìm thấy thông tin lịch chiếu rạp này.</p>
        </div>
      );
    }

    // Bóc tách danh sách lịch chiếu
    const danhSachLichChieu = contentData.flatMap((heThongRap) =>
      heThongRap.lstCumRap?.flatMap((cumRap) =>
        cumRap.danhSachPhim?.flatMap((phim) =>
          (phim.lstLichChieuTheoPhim || []).map((lich) => ({
            ...lich,
            tenPhim: phim.tenPhim,
            hinhAnh: phim.hinhAnh,
            tenCumRap: cumRap.tenCumRap,
            diaChi: cumRap.diaChi,
          }))
        )
      ) || []
    );

    if (danhSachLichChieu.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-slate-400 font-medium">Hiện chưa có suất chiếu nào khả dụng.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {danhSachLichChieu.map((item) => {
          const dateObj = new Date(item.ngayChieuGioChieu);
          const timeStr = dateObj.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
          const dateStr = dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

          return (
            <div
              key={item.maLichChieu}
              className="group relative bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header Card: Tên rạp & Phim */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/50 px-2.5 py-0.5 rounded-md">
                      {item.tenRap}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-2 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {item.tenPhim || `Phim (Mã Rạp: ${item.maRap})`}
                    </h3>
                  </div>
                </div>

                {/* Thời gian & Giá vé */}
                <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/50 my-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Thời gian chiếu:</span>
                    <span className="font-semibold text-slate-100 bg-slate-800 px-2 py-0.5 rounded">
                      {timeStr} <span className="text-slate-400">({dateStr})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Giá vé:</span>
                    <span className="font-extrabold text-emerald-400">
                      {item.giaVe?.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link to={`/booking/${item.maLichChieu}`}>
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Đặt Vé Ngay
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800/80 pb-4">
          <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
            Lịch Chiếu Phim
          </h1>
        </div>

        {/* Content */}
        {renderShowTimes()}
      </div>
    </div>
  );
}