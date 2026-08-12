import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "../slice";

export default function FormSingin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.AuthSliceReducer || state.AuthSlice);

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
        navigate("/login"); // Chuyển hướng sang trang đăng nhập
      })
      .catch((err) => {
        console.error("Lỗi đăng ký:", err);
      });
  };

  const renderAlert = (content) => (
    <div
      className="p-2 mt-1 text-sm text-red-600 rounded-md bg-red-50 border border-red-200"
      role="alert"
    >
      {content}
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
    <div className="p-5 max-w-md mx-auto bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold text-center mb-5">Đăng Ký Tài Khoản</h1>

      {error &&
        renderAlert(
          typeof error === "string"
            ? error
            : error?.content || "Đăng ký thất bại, vui lòng thử lại!"
        )}

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Tài khoản */}
        <div>
          <label className="block mb-1 text-sm font-medium">Tài khoản</label>
          <input
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleOnChange}
            onBlur={handleValidation}
            type="text"
            placeholder="Nhập tài khoản"
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base block w-full px-3 py-2"
          />
          {validation.taiKhoan && renderAlert(validation.taiKhoan)}
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
          <input
            name="matKhau"
            value={user.matKhau}
            onChange={handleOnChange}
            onBlur={handleValidation}
            type="password"
            placeholder="Nhập mật khẩu"
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base block w-full px-3 py-2"
          />
          {validation.matKhau && renderAlert(validation.matKhau)}
        </div>

        {/* Họ tên */}
        <div>
          <label className="block mb-1 text-sm font-medium">Họ tên</label>
          <input
            name="hoTen"
            value={user.hoTen}
            onChange={handleOnChange}
            onBlur={handleValidation}
            type="text"
            placeholder="Nhập họ và tên"
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base block w-full px-3 py-2"
          />
          {validation.hoTen && renderAlert(validation.hoTen)}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleOnChange}
            onBlur={handleValidation}
            type="email"
            placeholder="example@gmail.com"
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base block w-full px-3 py-2"
          />
          {validation.email && renderAlert(validation.email)}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block mb-1 text-sm font-medium">Số điện thoại</label>
          <input
            name="soDt"
            value={user.soDt}
            onChange={handleOnChange}
            onBlur={handleValidation}
            type="text"
            placeholder="Nhập số điện thoại"
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base block w-full px-3 py-2"
          />
          {validation.soDt && renderAlert(validation.soDt)}
        </div>

        {/* Nút hành động */}
        <div className="pt-2">
          <button
            disabled={!isFormValid || loading}
            type="submit"
            className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-base text-sm px-4 py-2.5 transition-colors"
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </div>

        <div className="text-center pt-2">
          <span className="text-sm text-gray-600">Đã có tài khoản? </span>
          <Link to="/login" className="text-sm text-blue-600 font-semibold hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </div>
  );
}