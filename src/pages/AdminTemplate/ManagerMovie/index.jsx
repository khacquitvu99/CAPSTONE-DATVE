import { useState, useEffect } from "react";
import Movie from "./MagerMovie"; // Lưu ý đúng tên file ManagerMovie
import { fetchListMovie, deleteMovie, addMovie, updateMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ManagerMovieReducer);

  // State quản lý ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // State quản lý Modal Form (Thêm / Sửa)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    maPhim: "",
    tenPhim: "",
    hinhAnh: "",
    trailer: "",
  });

  // Debounce Search: Tự động dispatch sau 500ms người dùng dừng gõ
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchListMovie(searchTerm));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  // Handle Mở modal Thêm
  const handleOpenAddModal = () => {
    setEditingMovie(null);
    setFormData({ maPhim: "", tenPhim: "", hinhAnh: "", trailer: "" });
    setIsOpenModal(true);
  };

  // Handle Mở modal Sửa
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData(movie);
    setIsOpenModal(true);
  };

  // Handle Xóa
  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      dispatch(deleteMovie(maPhim));
    }
  };

  // Handle Thêm (Nút Thêm trên card phim)
  const handleAddFromCard = () => {
    handleOpenAddModal();
  };

  // Handle Submit Form (Cả Thêm lẫn Sửa)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (editingMovie) {
      dispatch(updateMovie(formData));
    } else {
      dispatch(addMovie(formData));
    }
    setIsOpenModal(false);
  };

  const renderListMovie = () => {
    const { data } = state;
    if (!data || data.length === 0) {
      return (
        <p className="col-span-full text-center text-gray-500 py-6">
          Không tìm thấy phim phù hợp.
        </p>
      );
    }

    return data.map((movie) => (
      <Movie
        key={movie.maPhim}
        movie={movie}
        onAdd={handleAddFromCard}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header & Button Thêm */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-heading">
          Danh sách phim đang chiếu
        </h1>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-green-600 text-white rounded-base font-semibold hover:bg-green-700 transition-colors"
        >
          + Thêm Phim Mới
        </button>
      </div>

      {/* Thanh tìm kiếm (Search Bar) */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm phim theo tên..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Hiển thị Loading / Danh sách phim */}
      {state.loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderListMovie()}
        </div>
      )}

      {/* Modal Form Thêm / Sửa */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingMovie ? "Cập nhật Phim" : "Thêm Phim Mới"}
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {!editingMovie && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mã Phim
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.maPhim}
                    onChange={(e) =>
                      setFormData({ ...formData, maPhim: e.target.value })
                    }
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên Phim
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenPhim}
                  onChange={(e) =>
                    setFormData({ ...formData, tenPhim: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Link Hình Ảnh
                </label>
                <input
                  type="text"
                  required
                  value={formData.hinhAnh}
                  onChange={(e) =>
                    setFormData({ ...formData, hinhAnh: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Link Trailer
                </label>
                <input
                  type="text"
                  required
                  value={formData.trailer}
                  onChange={(e) =>
                    setFormData({ ...formData, trailer: e.target.value })
                  }
                  className="w-full border rounded p-2 text-sm"
                />
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
                  {editingMovie ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}