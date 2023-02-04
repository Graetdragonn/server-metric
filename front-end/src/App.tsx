import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreatePage from './pages/create-account/CreateAccount';
import HomePage from './pages/dashboard/Dashboard';
import SettingsPage from './pages/settings/Settings';
import ForgotPasswordPage from "./pages/forgot-password/ForgotPassword";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreatePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;