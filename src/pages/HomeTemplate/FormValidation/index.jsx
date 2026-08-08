import { useState } from "react";

export default function FormValdation() {
  // Lưu/lấy thông tin người dùng nhập
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [validation, setValidation] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user, // clone lại user
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    // chặn reload trang
    event.preventDefault();
    console.log(user);
  };

  const handleValidation = (event) => {
    const { name, value } = event.target;
    let mess = "";
    if (value.trim() === "") {
      mess = `Vui long nhap ${name}`;
    }
    setValidation({
      ...validation,
      [name]: mess,
    });
  };

  const renderAlert = (content) => {
    return (
      <div
        className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
        role="alert"
      >
        {content}
      </div>
    );
  };

  const disabled = !user.taiKhoan || !user.matKhau;

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Tài khoản
        </label>
        <input
          name="taiKhoan"
          onChange={handleOnchange}
          onBlur={handleValidation}
          type="text"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        />
        {validation.taiKhoan && renderAlert(validation.taiKhoan)}
      </div>
      <div className="mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Mật khẩu
        </label>
        <input
          name="matKhau"
          onChange={handleOnchange}
          onBlur={handleValidation}
          type="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        />
        {validation.matKhau && renderAlert(validation.matKhau)}
      </div>
      <button
        disabled={disabled}
        type="submit"
        className="disabled:bg-gray-300 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        Login
      </button>
    </form>
  );
}
