import React, { useState } from 'react';

import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/start/Start';
import LoginPage from './pages/login/Login';
import CreatePage from './pages/create-account/CreateAccount';
import HomePage from './pages/dashboard/Dashboard';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreatePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;