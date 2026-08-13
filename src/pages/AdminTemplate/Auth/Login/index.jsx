import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../services/api";

export default function FormLogin() {
  const navigate = useNavigate();

  // Lưu thông tin người dùng nhập
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // Lưu thông báo lỗi validation client
  const [validation, setValidation] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // State quản lý lỗi từ API và trạng thái Loading
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    setApiError(""); // Xóa thông báo lỗi API khi người dùng gõ lại
  };

  // Validation tài khoản
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

  // Validation mật khẩu
  const passValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;

    if (value.trim() === "") {
      mess = "Mật khẩu không được để trống";
    } else if (!regexPassword.test(value)) {
      mess = "Mật khẩu phải chứa chữ thường, hoa, số và dài từ 6 đến 10 ký tự";
    }

    setValidation((prev) => ({
      ...prev,
      [name]: mess,
    }));
  };

  // Xử lý Gọi API Đăng Nhập
  const handleLogin = async (event) => {
    event.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const result = await api.post("QuanLyNguoiDung/DangNhap", user);
      const userInfo = result.data.content;

      // 1. Kiểm tra xem người dùng có phải là Quản Trị không
      if (userInfo.maLoaiNguoiDung === "QuanTri") {
        // 2. Lưu thông tin người dùng & token vào localStorage
        localStorage.setItem("USER_LOGIN", JSON.stringify(userInfo));

        alert("Đăng nhập thành công với quyền Quản Trị!");
        // 3. Chuyển hướng sang trang Admin Dashboard
        navigate("/admin/dashboard");
      } else {
        // Nếu là Khách Hàng thì từ chối quyền truy cập trang Admin
        setApiError("Tài khoản của bạn không có quyền truy cập trang Quản Trị!");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.content ||
        error.response?.data ||
        "Tài khoản hoặc mật khẩu không chính xác!";
      setApiError(typeof errorMsg === "string" ? errorMsg : "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const renderAlert = (content) => {
    return (
      <div
        className="flex items-center gap-2 p-3 mt-2 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl"
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

  const isDisabled = !isFormValid || loading;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Hiệu ứng Background Glow chìm */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Thẻ Kính Đăng Nhập */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-indigo-950/40 backdrop-blur-xl relative z-10 space-y-6">

        {/* Header Form */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Đăng Nhập Quản Trị
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Vui lòng nhập tài khoản Admin để tiếp tục
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Hiển thị lỗi từ API (nếu có) */}
          {apiError && renderAlert(apiError)}

          {/* Ô Nhập Tài Khoản */}
          <div>
            <label className="block mb-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tài khoản
            </label>
            <div className="relative">
              <input
                name="taiKhoan"
                value={user.taiKhoan}
                onChange={handleOnchange}
                onBlur={(e) => lengthValidation(e, 3, 20)}
                type="text"
                placeholder="Nhập tài khoản..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 transition-all shadow-inner"
              />
            </div>
            {validation.taiKhoan && renderAlert(validation.taiKhoan)}
          </div>

          {/* Ô Nhập Mật Khẩu */}
          <div>
            <label className="block mb-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                name="matKhau"
                value={user.matKhau}
                onChange={handleOnchange}
                onBlur={(e) => passValidation(e)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-3 transition-all shadow-inner"
              />
            </div>
            {validation.matKhau && renderAlert(validation.matKhau)}
          </div>

          {/* Nút Đăng Nhập */}
          <div className="pt-2">
            <button
              disabled={isDisabled}
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
                <span>Đăng Nhập System</span>
              )}
            </button>
          </div>
        </form>

        {/* Chuyển hướng Đăng Ký */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-3">
          <p className="text-xs text-slate-400">Chưa có tài khoản quản trị?</p>
          <Link to="/admin/Admin-Singin" className="block">
            <button
              type="button"
              className="w-full border border-slate-800 hover:bg-slate-800/60 text-slate-300 hover:text-white font-medium text-xs rounded-xl py-2.5 transition-all duration-200"
            >
              Đăng Ký Tài Khoản Mới
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}