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
        className="p-2 mt-2 text-sm text-red-600 rounded-md bg-red-50 border border-red-200"
        role="alert"
      >
        {content}
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
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Đăng Ký</h1>
      <form onSubmit={handleRegister} className="max-w-sm mx-auto">
        {/* Tài khoản */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Tài khoản đăng nhập
          </label>
          <input
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleOnchange}
            onBlur={handleTaiKhoanValidation}
            type="text"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.taiKhoan && renderAlert(validation.taiKhoan)}
        </div>

        {/* Họ tên */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Họ tên
          </label>
          <input
            name="hoTen"
            value={user.hoTen}
            onChange={handleOnchange}
            onBlur={handleHoTenValidation}
            type="text"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.hoTen && renderAlert(validation.hoTen)}
        </div>

        {/* Số điện thoại */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Số điện thoại
          </label>
          <input
            name="soDienThoai"
            value={user.soDienThoai}
            onChange={handleOnchange}
            onBlur={handlePhoneValidation}
            type="text"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.soDienThoai && renderAlert(validation.soDienThoai)}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Email
          </label>
          <input
            name="email"
            value={user.email}
            onChange={handleOnchange}
            onBlur={handleEmailValidation}
            type="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.email && renderAlert(validation.email)}
        </div>

        {/* Mật khẩu */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Mật khẩu
          </label>
          <input
            name="matKhau"
            value={user.matKhau}
            onChange={handleOnchange}
            onBlur={handlePassValidation}
            type="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.matKhau && renderAlert(validation.matKhau)}
        </div>

        {/* Nút Submit */}
        <div className="flex gap-3">
          <button
            disabled={isDisabled}
            type="submit"
            className="disabled:bg-gray-300 disabled:cursor-not-allowed text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Đăng Ký
          </button>
          
        </div>
      </form>
    </div>
  );
}