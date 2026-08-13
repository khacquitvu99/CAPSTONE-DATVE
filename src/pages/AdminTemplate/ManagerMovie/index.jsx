import { useState, useEffect } from "react";
import Movie from "./MagerMovie";
import { fetchListMovie, deleteMovie, addMovie, updateMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ManagerMovieReducer || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgPreview, setImgPreview] = useState("");

  const [formData, setFormData] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "2026-08-13",
    danhGia: 10,
    hot: false,
    dangChieu: false,
    sapChieu: false,
  });

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchListMovie(searchTerm));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const handleOpenAddModal = () => {
    setEditingMovie(null);
    setSelectedFile(null);
    setImgPreview("");
    setFormData({
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "2026-08-13",
      danhGia: 10,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    });
    setIsOpenModal(true);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setSelectedFile(null);
    setImgPreview(movie.hinhAnh || "");

    setFormData({
      maPhim: movie.maPhim || "",
      tenPhim: movie.tenPhim || "",
      biDanh: movie.biDanh || movie.tenPhim || "",
      trailer: movie.trailer || "",
      moTa: movie.moTa || "",
      ngayKhoiChieu: movie.ngayKhoiChieu ? movie.ngayKhoiChieu.slice(0, 10) : "2026-08-13",
      danhGia: movie.danhGia || 10,
      hot: movie.hot || false,
      dangChieu: movie.dangChieu || false,
      sapChieu: movie.sapChieu || false,
    });
    setIsOpenModal(true);
  };

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      dispatch(deleteMovie(maPhim))
        .unwrap()
        .then(() => alert("Xóa phim thành công!"))
        .catch((err) => alert(typeof err === "string" ? err : "Xóa thất bại!"));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form - Đóng gói FormData đúng chuẩn CyberSoft
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = new FormData();
    if (editingMovie) {
      payload.append("maPhim", formData.maPhim);
    }
    payload.append("tenPhim", formData.tenPhim);
    payload.append("biDanh", formData.biDanh || formData.tenPhim);
    payload.append("trailer", formData.trailer);
    payload.append("moTa", formData.moTa || formData.tenPhim);
    payload.append("maNhom", "GP03");

    // Định dạng ngày DD/MM/YYYY
    const [year, month, day] = formData.ngayKhoiChieu.split("-");
    payload.append("ngayKhoiChieu", `${day}/${month}/${year}`);

    payload.append("danhGia", formData.danhGia);
    payload.append("hot", formData.hot);
    payload.append("dangChieu", formData.dangChieu);
    payload.append("sapChieu", formData.sapChieu);

    // XỬ LÝ KHÁC BIỆT KEY UPLOAD FILE
    if (selectedFile) {
      if (editingMovie) {
        payload.append("hinhAnh", selectedFile, selectedFile.name);
      } else {
        payload.append("File", selectedFile, selectedFile.name);
      }
    }

    const action = editingMovie ? updateMovie(payload) : addMovie(payload);

    dispatch(action)
      .unwrap()
      .then(() => {
        alert(editingMovie ? "Cập nhật phim thành công!" : "Thêm phim mới thành công!");
        setIsOpenModal(false);
      })
      .catch((err) => {
        alert(typeof err === "string" ? err : "Có lỗi xảy ra, vui lòng kiểm tra lại!");
      });
  };

  const renderListMovie = () => {
    const { data } = state;
    if (!data || data.length === 0) {
      return (
        <div className="col-span-full text-center py-12 bg-slate-900/50 border border-slate-800/80 rounded-2xl">
          <p className="text-slate-400 font-medium text-sm">
            Không tìm thấy phim phù hợp với từ khóa.
          </p>
        </div>
      );
    }

    return data.map((movie) => (
      <Movie
        key={movie.maPhim}
        movie={movie}
        onAdd={handleOpenAddModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header & Button Thêm Phim */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Quản Lý Danh Sách Phim
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Xem, tìm kiếm, thêm mới và cập nhật danh sách phim trong hệ thống
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950/30 transition-all duration-200 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm Phim Mới</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm phim theo tên..."
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 text-xs bg-slate-800 hover:bg-slate-700 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Danh Sách Phim Grid */}
        {state.loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-slate-400">Đang tải dữ liệu phim...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderListMovie()}
          </div>
        )}

      </div>

      {/* Modal Form Thêm / Cập nhật Phim */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl shadow-indigo-950/50 max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-100">
                {editingMovie ? "Cập Nhật Thông Tin Phim" : "Thêm Phim Mới Vừa Khởi Chiếu"}
              </h2>
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Tên phim */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tên Phim
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenPhim}
                  onChange={(e) => setFormData({ ...formData, tenPhim: e.target.value })}
                  placeholder="Nhập tên phim..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all"
                />
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mô Tả
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  placeholder="Tóm tắt nội dung phim..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all"
                />
              </div>

              {/* Link Trailer */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Link Trailer Youtube
                </label>
                <input
                  type="text"
                  required
                  value={formData.trailer}
                  onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all"
                />
              </div>

              {/* Ngày Khởi Chiếu */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Ngày Khởi Chiếu
                </label>
                <input
                  type="date"
                  required
                  value={formData.ngayKhoiChieu}
                  onChange={(e) => setFormData({ ...formData, ngayKhoiChieu: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3.5 py-2.5 transition-all"
                />
              </div>

              {/* Upload File Ảnh */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Poster Phim (Hình Ảnh)
                </label>
                <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center bg-slate-950/50 hover:border-slate-700 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30 cursor-pointer"
                  />
                  {imgPreview && (
                    <div className="mt-3 flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <img src={imgPreview} alt="Preview" className="w-16 h-20 object-cover rounded-md" />
                      <span className="text-xs text-slate-400 italic">Ảnh xem trước poster</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cụm Checkbox trạng thái phim */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.hot}
                    onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>🔥 Phim Hot</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.dangChieu}
                    onChange={(e) => setFormData({ ...formData, dangChieu: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>🎬 Đang Chiếu</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.sapChieu}
                    onChange={(e) => setFormData({ ...formData, sapChieu: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>⏳ Sắp Chiếu</span>
                </label>
              </div>

              {/* Nút Submit/Hủy */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  {editingMovie ? "Cập Nhật Phim" : "Lưu Phim Mới"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}