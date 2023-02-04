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
import Settings from "./pages/settings/Settings";
import SingleServer from "./pages/single-server/SingleServer";


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
          <Route path="/settings" element={<Settings />} />
          <Route path="/single-server" element={<SingleServer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;