export default function ManagerAcc(props) {
  const { user, onEdit, onDelete } = props;

  if (!user) return null;

  const displayName = user.hoTen || user.tenNguoiDung || "Không tên";
  const isQuanTri = user.maLoaiNguoiDung === "QuanTri";

  // Lấy chữ cái đầu tiên làm Avatar Avatar
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="group relative bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5">
      
      {/* Vệt sáng góc mờ khi hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

      {/* Khối thông tin hiển thị */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center w-full">
        
        {/* Cột 1: Avatar + Họ tên & Tài khoản */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border shadow-inner ${
              isQuanTri
                ? "bg-purple-950/80 text-purple-300 border-purple-700/50"
                : "bg-indigo-950/80 text-indigo-300 border-indigo-700/50"
            }`}
          >
            {firstLetter}
          </div>
          <div className="min-w-0">
            <h5 className="font-bold text-slate-100 text-sm md:text-base truncate group-hover:text-indigo-300 transition-colors">
              {displayName}
            </h5>
            <p className="text-xs text-slate-400 font-mono truncate">
              @{user.taiKhoan}
            </p>
          </div>
        </div>

        {/* Cột 2: Email */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 truncate">
          <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{user.email || "—"}</span>
        </div>

        {/* Cột 3: Số điện thoại */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
          <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-mono">{user.soDT || user.soDt || "—"}</span>
        </div>

        {/* Cột 4: Badge Loại người dùng */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-xl border backdrop-blur-md ${
              isQuanTri
                ? "bg-purple-950/60 text-purple-300 border-purple-700/50"
                : "bg-sky-950/60 text-sky-300 border-sky-700/50"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isQuanTri ? "bg-purple-400" : "bg-sky-400"}`} />
            {isQuanTri ? "Quản Trị" : "Khách Hàng"}
          </span>
        </div>

      </div>

      {/* Cột Nút Bấm Sửa / Xóa */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80 shrink-0">
        <button
          onClick={() => onEdit && onEdit(user)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Sửa
        </button>

        <button
          onClick={() => onDelete && onDelete(user.taiKhoan)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Xóa
        </button>
      </div>

    </div>
  );
}