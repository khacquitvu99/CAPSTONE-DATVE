import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Link to="/admin/Admin-account">
        <h1>Account Dashboard</h1>
      </Link>
      <Link to="/admin/manager-movie">
        <h2>Movie Management</h2>
      </Link>
    </div>
  );
}
