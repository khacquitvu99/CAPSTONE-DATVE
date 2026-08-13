import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SinginValidation() {
  const navigate = useNavigate();

  // 1. Khởi tạo state lưu giá trị người dùng nhập (Đủ 5 trường)
  const [user, setUser] = useState({
    taiKhoan: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
    matKhau: "",
  });

  // 2. Khởi tạo state lưu thông báo lỗi (Đủ 5 trường)
  const [validation, setValidation] = useState({
    taiKhoan: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
    matKhau: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    if (validation[name]) {
      setValidation((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation Tài khoản (Rỗng + Độ dài 6-15)
  const handleTaiKhoanValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    if (value.trim() === "") {
      mess = "Tài khoản không được để trống";
    } else if (value.length < 6 || value.length > 15) {
      mess = "Tài khoản phải từ 6 đến 15 ký tự";
    }
    setValidation((prev) => ({ ...prev, [name]: mess }));
  };

  // Validation Họ tên (Rỗng + Độ dài 3-30)
  const handleHoTenValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    if (value.trim() === "") {
      mess = "Họ tên không được để trống";
    } else if (value.length < 3 || value.length > 30) {
      mess = "Họ tên phải từ 3 đến 30 ký tự";
    }
    setValidation((prev) => ({ ...prev, [name]: mess }));
  };

  // Validation Số điện thoại (Rỗng + Regex SĐT Việt Nam 10 số)
  const handlePhoneValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const numberRegex = /^0\d{9}$/;
    if (value.trim() === "") {
      mess = "Số điện thoại không được để trống";
    } else if (!numberRegex.test(value)) {
      mess = "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số";
    }
    setValidation((prev) => ({ ...prev, [name]: mess }));
  };

  // Validation Email (Rỗng + Định dạng Email)
  const handleEmailValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      mess = "Email không được để trống";
    } else if (!mailRegex.test(value)) {
      mess = "Email không đúng định dạng";
    }
    setValidation((prev) => ({ ...prev, [name]: mess }));
  };

  // Validation Mật khẩu (Rỗng + Regex mật khẩu mạnh 6-10)
  const handlePassValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    if (value.trim() === "") {
      mess = "Mật khẩu không được để trống";
    } else if (!regexPassword.test(value)) {
      mess = "Mật khẩu phải chứa chữ thường, hoa, số và dài từ 6 đến 10 ký tự";
    }
    setValidation((prev) => ({ ...prev, [name]: mess }));
  };

  const renderAlert = (content) => {
    return (
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
  };

  const handleRegister = (event) => {
    event.preventDefault();
    alert("Đăng ký thành công!");
    navigate("/login-validation");
  };

  // ĐIỀU KIỆN ENABLE BUTTON:
  // 1. Tất cả 5 ô đều đã được nhập (không ô nào rỗng)
  // 2. Không có bất kỳ lỗi nào trong object validation
  const isFormFilled = Object.values(user).every((val) => val.trim() !== "");
  const hasNoErrors = Object.values(validation).every((err) => err === "");

  const isDisabled = !(isFormFilled && hasNoErrors);

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
            Điền thông tin hợp lệ bên dưới để hoàn tất đăng ký
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Tài khoản */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tài khoản đăng nhập
            </label>
            <input
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleOnchange}
              onBlur={handleTaiKhoanValidation}
              type="text"
              placeholder="Nhập tài khoản (6 - 15 ký tự)"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.taiKhoan && renderAlert(validation.taiKhoan)}
          </div>

          {/* Họ tên */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Họ tên
            </label>
            <input
              name="hoTen"
              value={user.hoTen}
              onChange={handleOnchange}
              onBlur={handleHoTenValidation}
              type="text"
              placeholder="Nhập họ và tên đầy đủ"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.hoTen && renderAlert(validation.hoTen)}
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Số điện thoại
            </label>
            <input
              name="soDienThoai"
              value={user.soDienThoai}
              onChange={handleOnchange}
              onBlur={handlePhoneValidation}
              type="text"
              placeholder="0xxxxxxxxx"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.soDienThoai && renderAlert(validation.soDienThoai)}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email
            </label>
            <input
              name="email"
              value={user.email}
              onChange={handleOnchange}
              onBlur={handleEmailValidation}
              type="email"
              placeholder="example@gmail.com"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.email && renderAlert(validation.email)}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Mật khẩu
            </label>
            <input
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnchange}
              onBlur={handlePassValidation}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all shadow-inner"
            />
            {validation.matKhau && renderAlert(validation.matKhau)}
          </div>

          {/* Nút Đăng Ký */}
          <div className="pt-2">
            <button
              disabled={isDisabled}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl py-3 shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <span>Đăng Ký Tài Khoản</span>
            </button>
          </div>
        </form>

        {/* Chuyển sang Đăng Nhập */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <span className="text-xs text-slate-400">Đã có tài khoản? </span>
          <Link to="/login-validation" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4">
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
}