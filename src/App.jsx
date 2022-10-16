import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/idex";
import GlobalStyle from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard user={user} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
