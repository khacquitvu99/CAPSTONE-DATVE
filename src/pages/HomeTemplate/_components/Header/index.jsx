import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-neutral-primary w-full z-20 top-0 inset-s-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.png"
            className="h-20 w-20 rounded-full"
            alt="Logo"
          />

          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Digital Movie
          </span>
        </NavLink>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
                aria-current="page"
              >
                Trang Chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="list-cinema"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Rạp Chiếu
              </NavLink>
            </li>

            <li>
              <NavLink
                to="login-validation"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Tài Khoản
              </NavLink>
            </li>
            <li>
              <NavLink
                to="admin/Admin-Login"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Manager
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
}
