import { useState, useEffect } from "react";
import Acc from "./Acc";
import { fetchListUsers, deleteUser, addUser, updateUser } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListUsers() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ManagerAccReducer || {});

  // State quản lý Modal Form (Thêm / Sửa)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",
  });

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  // Reset form khi mở modal Thêm mới
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "KhachHang",
    });
    setIsOpenModal(true);
  };

  // Mở modal Sửa và đổ dữ liệu người dùng
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      taiKhoan: user.taiKhoan || "",
      matKhau: user.matKhau || "",
      hoTen: user.hoTen || "",
      email: user.email || "",
      soDt: user.soDt || "",
      maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
    });
    setIsOpenModal(true);
  };

  // Handle Xóa người dùng
  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${taiKhoan}?`)) {
      dispatch(deleteUser(taiKhoan));
    }
  };

  // Handle Submit Form (Thêm hoặc Sửa)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    setIsOpenModal(false);
  };

  const renderListUser = () => {
    const { data } = state;
    return data?.map((user) => (
      <Acc
        key={user.taiKhoan}
        user={user}
        onAdd={handleOpenAddModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  };

  if (state.loading) return <p className="text-center py-10">Đang tải dữ liệu...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-heading">
          Quản Lý Danh Sách Người Dùng
        </h1>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-green-600 text-white rounded-base font-semibold hover:bg-green-700 transition-colors"
        >
          + Thêm Người Dùng Mới
        </button>
      </div>

      {/* Hiển thị dạng danh sách hàng ngang */}
      <div className="space-y-3">
        {renderListUser()}
      </div>

      {/* Modal Form Thêm / Sửa Người Dùng */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Cập Nhật Thông Tin Người Dùng" : "Thêm Người Dùng Mới"}
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Tài khoản */}
              <div>
                <label className="block text-sm font-medium mb-1">Tài Khoản</label>
                <input
                  type="text"
                  required
                  disabled={!!editingUser} // Khóa ô tài khoản khi chỉnh sửa
                  value={formData.taiKhoan}
                  onChange={(e) =>
                    setFormData({ ...formData, taiKhoan: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm disabled:bg-gray-100"
                />
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium mb-1">Mật Khẩu</label>
                <input
                  type="password"
                  required
                  value={formData.matKhau}
                  onChange={(e) =>
                    setFormData({ ...formData, matKhau: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              {/* Họ Tên */}
              <div>
                <label className="block text-sm font-medium mb-1">Họ và Tên</label>
                <input
                  type="text"
                  required
                  value={formData.hoTen}
                  onChange={(e) =>
                    setFormData({ ...formData, hoTen: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              {/* Số Điện Thoại */}
              <div>
                <label className="block text-sm font-medium mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  required
                  value={formData.soDt}
                  onChange={(e) =>
                    setFormData({ ...formData, soDt: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              {/* Loại Người Dùng */}
              <div>
                <label className="block text-sm font-medium mb-1">Loại Người Dùng</label>
                <select
                  value={formData.maLoaiNguoiDung}
                  onChange={(e) =>
                    setFormData({ ...formData, maLoaiNguoiDung: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                >
                  <option value="KhachHang">Khách Hàng</option>
                  <option value="QuanTri">Quản Trị</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Cập Nhật" : "Tạo Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}