import { useParams } from "react-router-dom";
import { fetchDetailCinema } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DetailCinema() {
    const state = useSelector((state) => state.detailCinemaReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const { idcinema } = params;

    useEffect(() => {
        dispatch(fetchDetailCinema(idcinema));
    }, []);

    if (state.loading) return <p>Loading...</p>;

    const renderInfoCinema = () => {
        const { data } = state;
        if (!data || data.length === 0) {
            return <p className="text-gray-500">Không có dữ liệu cụm rạp</p>;
        }

        return data.map((item) => {
            return (
                <div
                    key={item.maCumRap}
                    className="p-4 mb-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white"
                >
                    <h2 className="text-lg font-bold text-gray-800">
                        {item.tenCumRap}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium text-gray-700">Địa chỉ: </span>
                        {item.diaChi}
                    </p>
                    <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors">
                            Mua Vé
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                            Lịch Chiếu
                        </button>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            {renderInfoCinema()}
        </div>
    );
}
