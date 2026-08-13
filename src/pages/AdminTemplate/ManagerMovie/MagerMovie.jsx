export default function ManagerMovie(props) {
  const { movie, onEdit, onDelete } = props;

  // Hàm format ngày định dạng DD/MM/YYYY bằng JS thuần (Không cần thư viện)
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-xl hover:shadow-indigo-950/20 hover:border-slate-700/80 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden h-full group">
      <div>
        {/* Poster Phim */}
        <div className="relative overflow-hidden h-64 bg-slate-950">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            onError={(e) => {
              e.target.src = "https://picsum.photos/300/400";
            }}
          />
          {/* Dải gradient che mờ chân ảnh */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

          {/* Badge hiển thị Mã Phim */}
          {movie.maPhim && (
            <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              #{movie.maPhim}
            </span>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="p-5 space-y-3">
          <h5
            className="text-lg font-bold tracking-tight text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1"
            title={movie.tenPhim}
          >
            {movie.tenPhim}
          </h5>

          {/* Ngày khởi chiếu */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              Khởi chiếu:{" "}
              <strong className="text-slate-200 font-semibold">
                {formatDate(movie.ngayKhoiChieu)}
              </strong>
            </span>
          </div>

          {/* Link Trailer Youtube */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Trailer: </span>
            {movie.trailer ? (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors hover:underline"
              >
                <span>Xem Trailer</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span className="text-slate-500 italic">Chưa cập nhật</span>
            )}
          </div>

          {/* Mô tả phim */}
          <p
            className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1"
            title={movie.moTa}
          >
            {movie.moTa || "Chưa có mô tả cho phim này."}
          </p>
        </div>
      </div>

      {/* Hàng nút bấm Sửa - Xóa */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => onEdit && onEdit(movie)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 text-amber-400 hover:text-slate-950 font-semibold text-xs rounded-xl transition-all duration-200 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Sửa</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(movie.maPhim)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white font-semibold text-xs rounded-xl transition-all duration-200 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
}