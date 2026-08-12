import { Link } from "react-router-dom";

export default function ManagerMovie(props) {
  const { movie, onAdd, onEdit, onDelete } = props;

  return (
    <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs overflow-hidden">
      <div className="p-6 text-center">
          <img
            className="w-full h-64 object-cover rounded-t-base"
            src={movie.hinhAnh}
            alt={movie.tenPhim}
          />
        <h5 className="mt-3 mb-4 text-2xl font-semibold tracking-tight text-heading truncate">
          {movie.tenPhim}
        </h5>
       

        {/* Hàng 3 nút bấm Thêm - Sửa - Xóa */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
          
          <button
            onClick={() => onEdit && onEdit(movie)}
            className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-base font-medium text-sm hover:bg-amber-600 transition-colors"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete && onDelete(movie.maPhim)}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-base font-medium text-sm hover:bg-red-700 transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}