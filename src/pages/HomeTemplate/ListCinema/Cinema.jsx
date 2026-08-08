import { Link } from "react-router-dom"

export default function Cinema(props) {
  const { cinema } = props;
  return (
    <Link to={`/Detail-cinema/${cinema.maHeThongRap}`}
      className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
      <div >
        <div className="p-6 text-center">
          <img className="rounded-t-base" src={cinema.logo} alt={cinema.tenHeThongRap} />
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
            {cinema.tenHeThongRap}
          </h5>
        </div>
      </div>
    </Link>
  );
}
