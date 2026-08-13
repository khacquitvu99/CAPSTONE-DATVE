import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "../slice";

export default function FormSingin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.AuthSliceReducer || state.AuthSlice || {});

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });

  const [validation, setValidation] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });

    if (validation[name]) {
      setValidation((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation tổng hợp dựa trên loại field
  const handleValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const val = value.trim();

    if (val === "") {
      mess = "Trường này không được để trống";
    } else {
      switch (name) {
        case "taiKhoan":
          if (val.length < 6 || val.length > 15) {
            mess = "Tài khoản phải từ 6 đến 15 ký tự";
          }
          break;

        case "matKhau":
          const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
          if (!regexPassword.test(val)) {
            mess = "Mật khẩu chứa chữ thường, hoa, số và từ 6 đến 10 ký tự";
          }
          break;

        case "email":
          const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!regexEmail.test(val)) {
            mess = "Email không đúng định dạng (VD: example@gmail.com)";
          }
          break;

        case "soDt":
          const regexPhone = /^[0-9]{10,11}$/;
          if (!regexPhone.test(val)) {
            mess = "Số điện thoại phải từ 10 đến 11 chữ số";
          }
          break;

        case "hoTen":
          if (val.length < 2) {
            mess = "Họ tên quá ngắn";
          }
          break;

        default:
          break;
      }
    }

    setValidation((prev) => ({
      ...prev,
      [name]: mess,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    dispatch(registerService(user))
      .unwrap()
      .then(() => {
        alert("Đăng ký tài khoản thành công!");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Lỗi đăng ký:", err);
      });
  };

  const renderAlert = (content) => (
    <div
      className="flex items-center gap-2 p-2.5 mt-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl"
      role="alert"
    >
      <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{content}</span>
    </div>
  );

  // Điều kiện kích hoạt nút Submit
  const isFormValid =
    user.taiKhoan.trim() !== "" &&
    user.matKhau.trim() !== "" &&
    user.email.trim() !== "" &&
    user.soDt.trim() !== "" &&
    user.hoTen.trim() !== "" &&
    Object.values(validation).every((val) => val === "");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12 relative overflow-hidden">

      {/* Hiệu ứng Background Glow chìm */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Card Kính Đăng Ký */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-indigo-950/40 backdrop-blur-xl relative z-10 space-y-6">

        {/* Header Form */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Tạo Tài Khoản Mới
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Điền đầy đủ thông tin bên dưới để bắt đầu
          </p>
        </div>

        {error &&
          renderAlert(
            typeof error === "string"
              ? error
              : error?.content || "Đăng ký thất bại, vui lòng thử lại!"
          )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Tài khoản */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tài khoản
            </label>
            <input
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleOnChange}
              onBlur={handleValidation}
              type="text"
              placeholder="Nhập tài khoản"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.taiKhoan && renderAlert(validation.taiKhoan)}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Mật khẩu
            </label>
            <input
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnChange}
              onBlur={handleValidation}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.matKhau && renderAlert(validation.matKhau)}
          </div>

          {/* Họ tên */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Họ tên
            </label>
            <input
              name="hoTen"
              value={user.hoTen}
              onChange={handleOnChange}
              onBlur={handleValidation}
              type="text"
              placeholder="Nhập họ và tên"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.hoTen && renderAlert(validation.hoTen)}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email
            </label>
            <input
              name="email"
              value={user.email}
              onChange={handleOnChange}
              onBlur={handleValidation}
              type="email"
              placeholder="example@gmail.com"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.email && renderAlert(validation.email)}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Số điện thoại
            </label>
            <input
              name="soDt"
              value={user.soDt}
              onChange={handleOnChange}
              onBlur={handleValidation}
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.soDt && renderAlert(validation.soDt)}
          </div>

          {/* Nút Đăng ký */}
          <div className="pt-2">
            <button
              disabled={!isFormValid || loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl py-3 shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <span>Đăng Ký Tài Khoản</span>
              )}
            </button>
          </div>
        </form>

        {/* Chuyển sang Đăng Nhập */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <span className="text-xs text-slate-400">Đã có tài khoản? </span>
          <Link to="/login" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
}