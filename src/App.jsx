import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeTemplate from "./pages/HomeTemplate";
import Home from "./pages/HomeTemplate/Home";
import About from "./pages/HomeTemplate/About";
import ListMovie from "./pages/HomeTemplate/ListMovie";
import LoginValdation from "./pages/HomeTemplate/FormValidation/Login";
import SinginValdation from "./pages/HomeTemplate/FormValidation/Singin";
import DetailMovie from "./pages/HomeTemplate/DetailMovie";
import ListCinema from "./pages/HomeTemplate/ListCinema";
import ShowTimes from "./pages/HomeTemplate/MovieShowTimes";
import DetailCinema from "./pages/HomeTemplate/DetailCinema";

import AdminTemplate from "./pages/AdminTemplate";
// import AddUser from "./pages/AdminTemplate/AddUser";
// import Auth from "./pages/AdminTemplate/Auth";
import ManagerMovie from "./pages/AdminTemplate/ManagerMovie";
import AdminLogin from "./pages/AdminTemplate/Auth/Login";
import AdminSingin from "./pages/AdminTemplate/Auth/Singin";
import Dashboard from "./pages/AdminTemplate/Dashboard";
import Account from "./pages/AdminTemplate/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="list-movie" element={<ListMovie />} />
          <Route path="login-validation" element={<LoginValdation />} />
          <Route path="singin-validation" element={<SinginValdation />} />
          <Route path="Detail-movie/:id" element={<DetailMovie />} />
          <Route path="Detail-cinema/:idcinema" element={<DetailCinema />} />
          <Route path="list-cinema" element={<ListCinema />} />
          <Route path="Show-Times/:idRap" element={<ShowTimes />} />
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="add-user" element={<AddUser />} /> */}
          <Route path="manager-movie" element={<ManagerMovie />} />
          <Route path="Admin-Login" element={<AdminLogin />} />
          <Route path="Admin-Singin" element={<AdminSingin />} />
          <Route path="Admin-account" element={<Account />} />
        </Route>
        {/* <Route path="Auth" element={<Auth />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
