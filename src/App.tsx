import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/idex";
import GlobalStyle from "./styles/global";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard  />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
