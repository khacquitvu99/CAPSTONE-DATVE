import { useParams } from "react-router-dom";
import { fetchShowTimes } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ShowTimes() {
    const state = useSelector((state) => state.ShowTimesReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        dispatch(fetchShowTimes(id));
    }, []);

    if (state.loading) return <p>Loading...</p>;

    const renderShowTimes = () => {
        const { data } = state;
        console.log(data);
       
        if (data) {
            return (
                <div>
                    <h1>Lịch Chiếu</h1>

                    <h1>Ten Rạp: {data.tenRap}</h1>
                    <p>Ngày/Giờ chiếu: {data.ngayChieuGioChieu}</p>
                    <p>Giá Vé: {data.giaVe}</p>
                    <p>Thời Lượng: {data.thoiLuong}</p>
                    <p>
                        <button className="text-red-500">Mua Vé</button>
                        <button className="text-blue-500">Lịch Chiếu</button>
                    </p>
                </div>
            );
        }
    };

    return (
        <div>
            {renderShowTimes()}
        </div>
    );
}
