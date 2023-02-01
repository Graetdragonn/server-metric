import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import HomePage from './pages/Home';
import LoginPage from './pages/LogIn';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
      </div>
  );
}
export default App;