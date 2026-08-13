import { Link } from "react-router-dom";

export default function Cinema(props) {
  const { cinema } = props;

  return (
    <Link
      to={`/Detail-cinema/${cinema.maHeThongRap}`}
      className="group relative block w-full bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/50"
    >
      <div className="p-6 flex flex-col items-center justify-center text-center gap-4">
        
        {/* Khung chứa Logo hệ thống rạp */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950 p-3 border border-slate-800 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-indigo-500/30">
          <img
            className="w-full h-full object-contain filter drop-shadow"
            src={cinema.logo}
            alt={cinema.tenHeThongRap}
          />
        </div>

        {/* Tên hệ thống rạp */}
        <h5 
          className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2"
          title={cinema.tenHeThongRap}
        >
          {cinema.tenHeThongRap}
        </h5>

        {/* Nút giả lập hiệu ứng hành động khi hover */}
        <span className="text-xs font-semibold text-indigo-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
          Xem cụm rạp
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>

      </div>
    </Link>
  );
}