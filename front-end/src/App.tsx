import React, { useState } from 'react';

import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreateAccountPage from './pages/create-account/CreateAccount';
import DashboardPage from './pages/dashboard/Dashboard';


const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;