import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreateAccountPage from './pages/create-account/CreateAccount';
import DashboardPage from './pages/dashboard/Dashboard';
import ForgotPasswordPage from "./pages/forgot-password/ForgotPassword";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;