import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreateAccountPage from './pages/create-account/CreateAccount';
import DashboardPage from './pages/dashboard/Dashboard';
import SettingsPage from './pages/settings/Settings';
import ForgotPasswordPage from "./pages/forgot-password/ForgotPassword";
import SingleServerPage from "./pages/single-server/SingleServer";
import AddServerPage from "./pages/add-server/AddServer";
import RemoveServerPage from "./pages/client-remove-server/RemoveServer";
import AddUserPage from "./pages/add-user/AddUser"
import DeleteUserPage from "./pages/delete-user/DeleteUser";
import AdminEditUserPage from "./pages/admin-edit-user/AdminEditUser";
import AdminSingleServerPage from "./pages/admin-single-server/AdminSingleServer";
import AdminDeleteServerPage from "./pages/admin-delete-server/AdminDeleteServer";
import AdminAddServerPage from "./pages/admin-add-server/AdminAddServer";
import ServiceProviderEditUserPage from "./pages/sp-edit-user/ServiceProviderEditUser";
import SearchServerPage from "./pages/search-server/SearchServer";
import AdminAllUsersPage from "./pages/admin-all-users/AdminAllUsers";
import * as Constants from "./constants";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={Constants.START_PAGE} element={<StartPage />} />
          <Route path={Constants.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={Constants.CREATE_ACCOUNT_PAGE} element={<CreateAccountPage />} />
          <Route path={Constants.DASHBOARD_PAGE} element={<DashboardPage />} />
          <Route path={Constants.SETTINGS_PAGE} element={<SettingsPage/>}/>
          <Route path={Constants.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage />} />
          <Route path={Constants.SINGLE_SERVER_PAGE} element={<SingleServerPage />} />
          <Route path={Constants.ADD_SERVER_PAGE} element={<AddServerPage />} />
          <Route path={Constants.REMOVE_SERVER_PAGE} element={<RemoveServerPage />} />
          <Route path={Constants.ADD_USER_PAGE} element={<AddUserPage />} />
          <Route path={Constants.DELETE_USER_PAGE} element={<DeleteUserPage />} />
          <Route path={Constants.ADMIN_EDIT_USER_PAGE} element={<AdminEditUserPage />} />
          <Route path={Constants.ADMIN_SINGLE_SERVER_PAGE} element={<AdminSingleServerPage />} />
          <Route path={Constants.ADMIN_DELETE_SERVER_PAGE} element={<AdminDeleteServerPage />} />
          <Route path={Constants.ADMIN_ADD_SERVER_PAGE} element={<AdminAddServerPage />} />
          <Route path={Constants.SERVICE_PROVIDER_EDIT_USER_PAGE} element={<ServiceProviderEditUserPage />} />
          <Route path={Constants.SEARCH_SERVER_PAGE} element={<SearchServerPage />} />
          <Route path={Constants.ADMIN_ALL_USERS_PAGE} element={<AdminAllUsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;