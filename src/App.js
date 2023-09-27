import logo from "./logo.svg";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as BigRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import InsertUser from "./pages/InsertUser";
import NotFoundPage from "./pages/NotFoundPage";
import InsertProduct from "./pages/InsertProduct";
import ViewProfile from "./pages/ViewProfile";
import ViewProduct from "./pages/ViewProduct";
function App() {
  return (
    <BigRouter>
      <MyNavBar />
      <Routes>
        <Route index element={<AllProducts />} />
        <Route path="allusers" element={<AllUsers />} />
        <Route path="newproduct" element={<InsertProduct />} />
        <Route path="newuser" element={<InsertUser />} />
        <Route path="user/:id" element={<ViewProfile />} />
        <Route path="product/:id" element={<ViewProduct />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BigRouter>
  );
}

export default App;
