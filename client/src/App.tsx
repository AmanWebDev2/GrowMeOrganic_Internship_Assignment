import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import { isAuth } from "./auth/isAuthenticated";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes/>}>
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

const PrivateRoutes = () => {
  const isAuthenticated = isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default App;
