import { Link } from "react-router-dom"

export default function Movie(props) {
  const { movie } = props;
  return (
    <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
      <div className="p-6 text-center">
        <Link to={`/Detail-movie/${movie.maPhim}`}>
          <img className="rounded-t-base" src={movie.hinhAnh} alt={movie.tenPhim} />
        </Link>
        <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
          {movie.tenPhim}
        </h5>
        <Link to={`/Show-Times/${movie.maPhim}`}>
          <button>Mua Vé</button>
        </Link>
        <p>
          <a href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer">
            <button>Xem Trailer</button>
          </a>
        </p>

      </div>
    </div>
  );
}
