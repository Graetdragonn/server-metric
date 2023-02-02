import React from 'react';
import axios from 'axios';
import logo from './style/logo.svg';
import './style/Start.css';
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Server Metric Tracker
        </p>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <button type="button" className="startbuttons" onClick={() => navigate('/login')}>Sign In</button>
        </div>
        <div>
          <button type="button" className="startbuttons" onClick={() => navigate('/createaccount')}>Create Account</button>
        </div>
      </header>

    </div>
  );
}

export default StartPage;

