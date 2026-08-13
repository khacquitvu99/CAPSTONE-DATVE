import { Link } from "react-router-dom";

export default function Dashboard() {
  const adminModules = [
    {
      title: "Quản Lý Tài Khoản",
      subtitle: "Account Dashboard",
      description: "Phân quyền, quản lý danh sách người dùng và tài khoản hệ thống.",
      link: "/admin/Admin-account",
      badge: "User Control",
      icon: (
        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Quản Lý Phim",
      subtitle: "Movie Management",
      description: "Thêm mới, chỉnh sửa, xóa danh sách phim và cập nhật lịch chiếu.",
      link: "/admin/manager-movie",
      badge: "Media System",
      icon: (
        <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                System Administrator
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              BẢNG QUẢN TRỊ DỰ ÁN
            </h1>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md">
            Trạng thái hệ thống: <span className="text-emerald-400 font-semibold">Hoạt động</span>
          </div>
        </div>

        {/* Grid Danh Sách Chức Năng Quản Lý */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminModules.map((item, index) => (
            <Link key={index} to={item.link} className="block group">
              <div className="h-full p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5">

                {/* Vệt màu hiệu ứng Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50 group-hover:bg-indigo-950 group-hover:text-indigo-300 group-hover:border-indigo-800/50 transition-all">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                    {item.title}
                    <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </h2>
                  <p className="text-xs font-mono text-indigo-400/80">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-300">
                  <span>Truy cập quản lý</span>
                  <span className="text-lg leading-none">→</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}