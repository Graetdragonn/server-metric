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
import Settings from "./pages/settings/Settings";
import SingleServer from "./pages/single-server/SingleServer";


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
          <Route path="/settings" element={<Settings />} />
          <Route path="/single-server" element={<SingleServer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;