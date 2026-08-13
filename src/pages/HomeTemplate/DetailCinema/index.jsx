import { Link, useParams } from "react-router-dom";
import { fetchDetailCinema } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DetailCinema() {
    const state = useSelector((state) => state.detailCinemaReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const { idcinema } = params;

    useEffect(() => {
        if (idcinema) {
            dispatch(fetchDetailCinema(idcinema));
        }
    }, [dispatch, idcinema]);

    // UI Skeleton Loading khi đang tải dữ liệu
    if (state.loading) {
        return (
            <div className="bg-slate-950 min-h-screen py-10 px-4 text-slate-100">
                <div className="max-w-5xl mx-auto space-y-4">
                    <div className="h-8 w-64 bg-slate-800/80 rounded-lg animate-pulse mb-8" />
                    {[1, 2, 3].map((n) => (
                        <div
                            key={n}
                            className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl animate-pulse space-y-4"
                        >
                            <div className="h-6 w-1/3 bg-slate-800 rounded-md" />
                            <div className="h-4 w-2/3 bg-slate-800/60 rounded-md" />
                            <div className="flex gap-3 pt-2">
                                <div className="h-10 w-28 bg-slate-800 rounded-xl" />
                                <div className="h-10 w-28 bg-slate-800 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { data } = state;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header tiêu đề */}
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800/80 pb-4">
                    <div className="h-7 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
                    <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
                        Danh Sách Cụm Rạp
                    </h1>
                </div>

                {/* Kiểm tra dữ liệu rỗng */}
                {!data || data.length === 0 ? (
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
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                        <p className="text-slate-400 text-sm font-medium">
                            Không tìm thấy thông tin cụm rạp nào.
                        </p>
                    </div>
                ) : (
                    /* Danh sách cụm rạp */
                    <div className="grid grid-cols-1 gap-5">
                        {data.map((item) => (
                            <div
                                key={item.maCumRap}
                                className="group relative overflow-hidden p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-lg hover:border-indigo-500/50 transition-all duration-300 hover:shadow-indigo-500/10 hover:-translate-y-1"
                            >
                                {/* Vệt sáng góc mờ trang trí */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                                    {/* Thông tin Rạp */}
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-700/40 text-indigo-400 shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                                                {item.tenCumRap}
                                            </h2>
                                        </div>

                                        <p className="text-xs md:text-sm text-slate-400 flex items-start gap-2 pl-1">
                                            <svg
                                                className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span className="leading-relaxed">{item.diaChi}</span>
                                        </p>
                                    </div>

                                    {/* Nhóm Nút Thao Tác */}
                                    <div className="flex items-center gap-3 pt-2 sm:pt-0 shrink-0">
                                        <button className="px-4 py-2 text-xs md:text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all duration-300 active:scale-95">
                                            Mua Vé
                                        </button>

                                        <Link to={`/Show-Times/${item.maCumRap}`}>
                                            <button className="px-4 py-2 text-xs md:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 active:scale-95 flex items-center gap-1.5">
                                                <span>Lịch Chiếu</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}