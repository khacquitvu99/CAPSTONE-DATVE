import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-indigo-950/20">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* LOGO & BRAND */}
        <NavLink
          to="/"
          className="flex items-center space-x-3 group focus:outline-none"
        >
          <div className="relative p-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              className="h-10 w-10 rounded-full object-cover bg-slate-900"
              alt="Digital Movie Logo"
            />
          </div>

          <span className="self-center text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
            Digital Movie
          </span>
        </NavLink>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-400 rounded-xl md:hidden hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        {/* MENU ITEMS */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-slate-800 rounded-2xl bg-slate-900 md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            
            {/* TRANG CHỦ */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative py-2 px-1 text-sm font-semibold transition-colors duration-300 block ${
                    isActive
                      ? "text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-violet-500 after:rounded-full"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                Trang Chủ
              </NavLink>
            </li>

            {/* RẠP CHIẾU */}
            <li>
              <NavLink
                to="list-cinema"
                className={({ isActive }) =>
                  `relative py-2 px-1 text-sm font-semibold transition-colors duration-300 block ${
                    isActive
                      ? "text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-violet-500 after:rounded-full"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                Rạp Chiếu
              </NavLink>
            </li>

            {/* TÀI KHOẢN */}
            <li>
              <NavLink
                to="login-validation"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800"
                  }`
                }
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Tài Khoản
              </NavLink>
            </li>

            {/* MANAGER / ADMIN */}
            <li>
              <NavLink
                to="admin/Admin-Login"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                      : "text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20"
                  }`
                }
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manager
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}