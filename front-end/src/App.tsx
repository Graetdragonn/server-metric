import React, { useState } from 'react';

import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import StartPage from './pages/Start';
import LoginPage from './pages/LogIn';
import CreatePage from './pages/CreateAccount';
import HomePage from './pages/Home';


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