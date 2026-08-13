import { useParams, Link } from "react-router-dom";
import { fetchDetailMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DetailMovie() {
  const state = useSelector((state) => state.detailMovieReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailMovie(id));
    }
  }, [id, dispatch]);

  // Skeleton Loading mượt mà khi tải chi tiết phim
  if (state.loading) {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          <div className="aspect-[2/3] bg-slate-900 border border-slate-800 rounded-2xl" />
          <div className="md:col-span-2 space-y-4">
            <div className="h-10 bg-slate-900 rounded-lg w-3/4" />
            <div className="h-6 bg-slate-900 rounded-lg w-1/4" />
            <div className="h-24 bg-slate-900 rounded-xl" />
            <div className="h-12 bg-slate-900 rounded-xl w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const renderInfoMovie = () => {
    const { data } = state;
    if (!data) return null;

    // Format ngày chiếu
    const releaseDate = data.ngayKhoiChieu
      ? new Date(data.ngayKhoiChieu).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "Đang cập nhật";

    return (
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-10 px-4">
        {/* Hình nền mờ phía sau tạo hiệu ứng điện ảnh */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={data.hinhAnh}
            alt=""
            className="w-full h-full object-cover filter blur-3xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto pt-6">
          {/* Breadcrumb / Tiêu đề nhỏ */}
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800/80 pb-4">
            <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
              Thông Tin Phim
            </h1>
          </div>

          {/* Main Layout 2 Cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start">
            {/* CỘT TRÁI: POSTER (4 Cols) */}
            <div className="md:col-span-1 lg:col-span-4 max-w-sm mx-auto md:max-w-none w-full">
              <div className="group relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-indigo-950/50">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={data.hinhAnh}
                  alt={data.tenPhim}
                />
                <div className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md backdrop-blur-md shadow-md">
                  P - Phim Chiếu Rạp
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT PHIM (8 Cols) */}
            <div className="md:col-span-2 lg:col-span-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                {/* Tên Phim */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
                  {data.tenPhim}
                </h1>

                {/* Bí danh */}
                {data.biDanh && (
                  <p className="text-sm font-medium text-slate-400 italic">
                    Tên khác: <span className="text-slate-300">{data.biDanh}</span>
                  </p>
                )}

                {/* Badge Đánh giá & Ngày chiếu */}
                <div className="flex flex-wrap items-center gap-4 py-2">
                  {/* Rating Badge */}
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400 font-bold text-sm">
                    <svg className="w-4 h-4 fill-current text-amber-400" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{data.danhGia || 10} / 10</span>
                  </div>

                  {/* Ngày khởi chiếu */}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-slate-300 text-xs sm:text-sm font-medium">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Khởi chiếu: {releaseDate}</span>
                  </div>
                </div>

                {/* Nội dung / Mô tả */}
                <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    Nội dung phim
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-6 md:line-clamp-none">
                    {data.moTa || "Chưa có mô tả nội dung cho phim này."}
                  </p>
                </div>
              </div>

              {/* Các nút bấm Hành động */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Nút Mua Vé */}
                <Link to={`/Show-Times/${data.maPhim}`} className="flex-1 sm:flex-none">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Mua Vé Ngay
                  </button>
                </Link>

                {/* Nút Xem Trailer */}
                {data.trailer && (
                  <a
                    href={data.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none"
                  >
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Xem Trailer
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderInfoMovie()}</div>;
}