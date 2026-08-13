import { useEffect } from "react";
import Cinema from "./Cinema";
import { fetchListCinema } from "./slice";
import { useSelector, useDispatch } from "react-redux";

export default function ShowTimesListCinema() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listCinemaReducer);

  useEffect(() => {
    dispatch(fetchListCinema());
  }, [dispatch]);

  const renderListCinema = () => {
    const { data } = state;
    return data?.map((cinema) => (
      <Cinema key={cinema.maHeThongRap} cinema={cinema} />
    ));
  };

  // Skeleton Loading tối màu hiện đại
  if (state.loading) {
    return (
      <div className="bg-slate-950 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-slate-800/80 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-44 bg-slate-900 border border-slate-800/80 rounded-2xl animate-pulse p-4 flex flex-col items-center justify-center gap-3"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-2xl" />
                <div className="w-20 h-4 bg-slate-800 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề mục rạp chiếu với thanh nhấn Indigo */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800/80 pb-4">
          <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
            Hệ thống rạp chiếu
          </h1>
        </div>

        {/* Lưới hiển thị danh sách Rạp */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {renderListCinema()}
        </div>
      </div>
    </div>
  );
}