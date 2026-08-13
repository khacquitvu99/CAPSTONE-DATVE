import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;

  return (
    <div className="group relative w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/40">
      
      {/* 1. KHU VỰC POSTER (Tỉ lệ 2/3 chuẩn điện ảnh) */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <Link to={`/Detail-movie/${movie.maPhim}`} className="block w-full h-full">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={movie.hinhAnh}
            alt={movie.tenPhim}
          />
        </Link>

        {/* Nút Xem Trailer hiển thị mượt mà khi Hover vào poster */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          {movie.trailer && (
            <a
              href={movie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto w-full py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold backdrop-blur-md border border-slate-700/60 transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
            >
              <svg className="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Xem Trailer
            </a>
          )}
        </div>
      </div>

      {/* 2. KHU VỰC THÔNG TIN & NÚT MUA VÉ */}
      <div className="p-4 flex flex-col justify-between gap-3">
        {/* Tên phim (Giới hạn 1 dòng, hiển thị '...' nếu dài quá) */}
        <Link to={`/Detail-movie/${movie.maPhim}`}>
          <h5 className="font-bold text-base text-slate-100 truncate group-hover:text-indigo-400 transition-colors" title={movie.tenPhim}>
            {movie.tenPhim}
          </h5>
        </Link>

        {/* Nút Mua Vé nổi bật */}
        <Link to={`/Show-Times/${movie.maPhim}`} className="w-full">
          <button 
            type="button" 
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Mua Vé
          </button>
        </Link>
      </div>

    </div>
  );
}