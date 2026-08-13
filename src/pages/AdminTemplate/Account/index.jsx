import { useState, useEffect } from "react";
import Acc from "./Acc";
import { fetchListUsers, deleteUser, addUser, updateUser } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListUsers() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ManagerAccReducer || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maNhom: "GP03", // Bắt buộc truyền maNhom cho CyberSoft API
    maLoaiNguoiDung: "KhachHang",
  });

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchListUsers(searchTerm));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maNhom: "GP03",
      maLoaiNguoiDung: "KhachHang",
    });
    setIsOpenModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      taiKhoan: user.taiKhoan || "",
      matKhau: user.matKhau || "",
      hoTen: user.hoTen || "",
      email: user.email || "",
      soDT: user.soDT || user.soDt || "",
      maNhom: user.maNhom || "GP03",
      maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
    });
    setIsOpenModal(true);
  };

  // Hàm xóa người dùng
  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${taiKhoan}?`)) {
      dispatch(deleteUser(taiKhoan))
        .unwrap()
        .then(() => {
          alert("Xóa người dùng thành công!");
          dispatch(fetchListUsers(searchTerm));
        })
        .catch((err) => {
          alert(typeof err === "string" ? err : "Xóa thất bại!");
        });
    }
  };

  // Hàm Submit Form Thêm/Sửa
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      soDt: formData.soDT,
      maNhom: "GP03",
    };

    const action = editingUser ? updateUser(payload) : addUser(payload);

    dispatch(action)
      .unwrap()
      .then(() => {
        alert(editingUser ? "Cập nhật thành công!" : "Thêm mới thành công!");
        setIsOpenModal(false);
        dispatch(fetchListUsers(searchTerm));
      })
      .catch((err) => {
        alert(typeof err === "string" ? err : "Thao tác thất bại!");
      });
  };

  const renderListUser = () => {
    const { data } = state;
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <svg
            className="w-12 h-12 mx-auto text-slate-600 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-slate-400 text-sm font-medium">
            Không tìm thấy người dùng phù hợp.
          </p>
        </div>
      );
    }

    return data.map((user) => (
      <Acc
        key={user.taiKhoan}
        user={user}
        onAdd={handleOpenAddModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Management */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
              Quản Lý Danh Sách Người Dùng
            </h1>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 active:scale-95 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm Người Dùng Mới</span>
          </button>
        </div>

        {/* Thanh Tìm Kiếm Search Box */}
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tài khoản hoặc họ tên..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
            <span className="absolute left-3.5 top-3 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Danh sách người dùng hoặc Skeleton */}
        {state.loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-20 bg-slate-900/60 border border-slate-800/80 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">{renderListUser()}</div>
        )}

      </div>

      {/* MODAL THÊM / SỬA NGƯỜI DÙNG */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-indigo-950/50 max-h-[90vh] overflow-y-auto space-y-6">

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {editingUser ? "Cập Nhật Thông Tin" : "Thêm Người Dùng Mới"}
              </h2>
              <button
                onClick={() => setIsOpenModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Tài Khoản
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingUser}
                  value={formData.taiKhoan}
                  onChange={(e) =>
                    setFormData({ ...formData, taiKhoan: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  required
                  value={formData.matKhau}
                  onChange={(e) =>
                    setFormData({ ...formData, matKhau: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  required
                  value={formData.hoTen}
                  onChange={(e) =>
                    setFormData({ ...formData, hoTen: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  required
                  value={formData.soDT}
                  onChange={(e) =>
                    setFormData({ ...formData, soDT: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Loại Người Dùng
                </label>
                <select
                  value={formData.maLoaiNguoiDung}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maLoaiNguoiDung: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="KhachHang">Khách Hàng</option>
                  <option value="QuanTri">Quản Trị</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
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