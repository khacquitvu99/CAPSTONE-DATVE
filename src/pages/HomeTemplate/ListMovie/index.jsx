import { useState, useEffect } from "react";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listMovieReducer);

  // State lưu từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Debounce search: Chờ 500ms sau khi người dùng dừng gõ mới dispatch action
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchListMovie(searchTerm));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const renderListMovie = () => {
    const { data } = state;

    if (!data || data.length === 0) {
      return (
        <p className="col-span-3 text-center text-gray-500 py-6">
          Không tìm thấy phim phù hợp.
        </p>
      );
    }

    return data.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Danh sách phim đang chiếu</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm phim theo tên..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

      {/* Danh sách phim */}
      {state.loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">{renderListMovie()}</div>
      )}
    </div>
  );
}