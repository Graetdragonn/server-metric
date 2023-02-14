import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreatePage from './pages/create-account/CreateAccount';
import DashboardPage from './pages/dashboard/Dashboard';
import SettingsPage from './pages/settings/Settings';
import EditSettingsPage from './pages/edit-settings/EditSettings';
import ForgotPasswordPage from "./pages/forgot-password/ForgotPassword";
import Settings from "./pages/settings/Settings";
import SingleServer from "./pages/single-server/SingleServer";
import AddServerPage from "./pages/add-server/AddServer";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreatePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/editsettings" element={<EditSettingsPage/>}/>
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/single-server" element={<SingleServer />} />
          <Route path="/addserver" element={<AddServerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;