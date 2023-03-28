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
import ForgotPasswordPage from "./pages/forgot-password/ForgotPassword";
import Settings from "./pages/settings/Settings";
import SingleServer from "./pages/single-server/SingleServer";
import AddServerPage from "./pages/add-server/AddServer";
import RemoveServerPage from "./pages/client-remove-server/RemoveServer";
import AddUserPage from "./pages/add-user/AddUser"
import DeleteUserPage from "./pages/delete-user/DeleteUser";
import AdminEditUserPage from "./pages/admin-edit-user/AdminEditUser";
import AdminSingleServerPage from "./pages/admin-single-server/AdminSingleServer";
import AdminDeleteServerPage from "./pages/admin-delete-server/AdminDeleteServer";
import AdminAddServerPage from "./pages/admin-add-server/AdminAddServer";
import ServiceProviderEditUserPage from "./pages/sp-edit-user/ServiceProviderEditUser";

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
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/single-server" element={<SingleServer />} />
          <Route path="/addserver" element={<AddServerPage />} />
          <Route path="/removeserver" element={<RemoveServerPage />} />
          <Route path="/adduser" element={<AddUserPage />} />
          <Route path="/deleteuser" element={<DeleteUserPage />} />
          <Route path="/adminedituser" element={<AdminEditUserPage />} />
          <Route path="/adminsingleserver" element={<AdminSingleServerPage />} />
          <Route path="/admindeleteserver" element={<AdminDeleteServerPage />} />
          <Route path="/adminaddserver" element={<AdminAddServerPage />} />
          <Route path="/spedituser" element={<ServiceProviderEditUserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;