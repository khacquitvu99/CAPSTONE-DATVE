import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FormLogin() {
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
      mess = "Mật khẩu phải chứa chữ thường, hoa, số và dài từ 6 đến 10 ký tự";
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
        className="p-2 mt-2 text-sm text-red-600 rounded-md bg-red-50 border border-red-200"
        role="alert"
      >
        {content}
      </div>
    );
  };

  // ĐIỀU KIỆN ENABLE NÚT SUBMIT:

  const isFormValid =
    user.taiKhoan.trim() !== "" &&
    user.matKhau.trim() !== "" &&
    validation.taiKhoan === "" &&
    validation.matKhau === "";

  const isDisabled = !isFormValid;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Đăng Nhập</h1>
      <form onSubmit={handleRegister} className="max-w-sm mx-auto">
        {/* Tài khoản */}
        <div className="mb-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Tài khoản
          </label>
          <input
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleOnchange}
            onBlur={(e) => lengthValidation(e, 6, 15)}
            type="text"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.taiKhoan && renderAlert(validation.taiKhoan)}
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
            onBlur={(e) => passValidation(e)}
            type="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {validation.matKhau && renderAlert(validation.matKhau)}
        </div>

        {/* Nút hành động */}
        <div className="flex gap-3">
          <Link to="/admin/dashboard">
            <button
              disabled={isDisabled}
              type="submit"
              className="disabled:bg-gray-300 disabled:cursor-not-allowed text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Đăng Nhập
            </button>
          </Link>

        </div>
        <div>
          <h6>Chưa có tài khoản?</h6>
          <Link to="/admin/Admin-Singin">
            <button
              type="button"
              className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Đăng Ký
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}