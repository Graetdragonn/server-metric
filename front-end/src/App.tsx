import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/Start';
import LoginPage from './pages/Login';
import CreatePage from './pages/CreateAccount';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;