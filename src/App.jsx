import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword/:userId" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
