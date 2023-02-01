import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './Start.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate
} from "react-router-dom";

const HomePage = (): JSX.Element => {
  const [clickedButton, setClickedButton] = useState('');
  const navigate = useNavigate();
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const button: HTMLButtonElement = event.currentTarget;
    
  };
  
  return (
    <div className="App">
      <header className="App-header">
       <p>
        Integrated Server Utility
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <button type="button" className="signin" onClick={() => navigate('/login')}> Sign In</button>
        <button>Create Account</button>
      </header>
      
    </div>
  );
}

export default HomePage;

