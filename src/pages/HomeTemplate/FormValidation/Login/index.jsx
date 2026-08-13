import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FormValdation() {
  const navigate = useNavigate();

  // Lưu thông tin người dùng nhập
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // Lưu thông báo lỗi validation
  const [validation, setValidation] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Tự động xóa lỗi khi người dùng bắt đầu nhập lại
    if (validation[name]) {
      setValidation((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation tài khoản (kiểm tra rỗng + độ dài)
  const lengthValidation = (event, min, max) => {
    const { name, value } = event.target;
    let mess = "";

    if (value.trim() === "") {
      mess = "Tài khoản không được để trống";
    } else if (value.length < min || value.length > max) {
      mess = `Tài khoản phải từ ${min} đến ${max} ký tự`;
    }

    setValidation((prev) => ({
      ...prev,
      [name]: mess,
    }));
  };

  // Validation mật khẩu (kiểm tra rỗng + định dạng regex)
  const passValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;

    if (value.trim() === "") {
      mess = "Mật khẩu không được để trống";
    } else if (!regexPassword.test(value)) {
      mess = "Mật khẩu chứa chữ thường, hoa, số và dài từ 6 đến 10 ký tự";
    }

    setValidation((prev) => ({
      ...prev,
      [name]: mess,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    alert("Đăng nhập thành công!");
    navigate("/");
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

  // ĐIỀU KIỆN ENABLE NÚT SUBMIT
  const isFormValid =
    user.taiKhoan.trim() !== "" &&
    user.matKhau.trim() !== "" &&
    validation.taiKhoan === "" &&
    validation.matKhau === "";

  const isDisabled = !isFormValid;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Hiệu ứng Glow mờ chìm phía sau */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Thẻ Kính Form Đăng Nhập */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-indigo-950/40 backdrop-blur-xl relative z-10 space-y-6">

        {/* Header Form */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Xác Thực Đăng Nhập
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Điền tài khoản và mật khẩu hợp lệ để truy cập hệ thống
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Tài khoản */}
          <div>
            <label className="block mb-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tài khoản
            </label>
            <input
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleOnchange}
              onBlur={(e) => lengthValidation(e, 6, 15)}
              type="text"
              placeholder="Nhập tài khoản (6 - 15 ký tự)"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 transition-all shadow-inner"
            />
            {validation.taiKhoan && renderAlert(validation.taiKhoan)}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block mb-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Mật khẩu
            </label>
            <input
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnchange}
              onBlur={(e) => passValidation(e)}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 transition-all shadow-inner"
            />
            {validation.matKhau && renderAlert(validation.matKhau)}
          </div>

          {/* Nút Đăng Nhập */}
          <div className="pt-2">
            <button
              disabled={isDisabled}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl py-3 shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <span>Đăng Nhập</span>
            </button>
          </div>
        </form>

        {/* Khu vực Chuyển hướng Đăng Ký */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-3">
          <p className="text-xs text-slate-400">Bạn chưa có tài khoản?</p>
          <Link to="/singin-validation" className="block">
            <button
              type="button"
              className="w-full border border-slate-800 hover:bg-slate-800/60 text-slate-300 hover:text-white font-medium text-xs rounded-xl py-2.5 transition-all duration-200"
            >
              Tạo Tài Khoản Mới
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}