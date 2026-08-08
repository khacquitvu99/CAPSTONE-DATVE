import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeTemplate from "./pages/HomeTemplate";
import Home from "./pages/HomeTemplate/Home";
import About from "./pages/HomeTemplate/About";
import ListMovie from "./pages/HomeTemplate/ListMovie";
import FormValdation from "./pages/HomeTemplate/FormValidation";
import DetailMovie from "./pages/HomeTemplate/DetailMovie";
import ListCinema from "./pages/HomeTemplate/ListCinema";
import ShowTimes from "./pages/HomeTemplate/MovieShowTimes";
import DetailCinema from "./pages/HomeTemplate/DetailCinema";




import AdminTemplate from "./pages/AdminTemplate";
import Dashboard from "./pages/AdminTemplate/Dashboard";
import AddUser from "./pages/AdminTemplate/AddUser";
import Auth from "./pages/AdminTemplate/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="list-movie" element={<ListMovie />} />
          <Route path="form-validation" element={<FormValdation />} />
          <Route path="Detail-movie/:id" element={<DetailMovie />} />
          <Route path="Detail-cinema/:idcinema" element={<DetailCinema />} />
          <Route path="list-cinema" element={<ListCinema />} />
          <Route path="Show-Times/:id" element={<ShowTimes />} />
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-user" element={<AddUser />} />
        </Route>
        <Route path="Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
