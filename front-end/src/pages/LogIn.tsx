import React, { useState } from 'react';
import './style/Login.css';
import { useNavigate } from "react-router-dom";
import { submit } from './LoginLogic';

const LoginPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    user: "",
    pass: ""
  });

  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(state.user, state.pass);
  };


  return (
    <div>
      <div className="backbutton" onClick={() => navigate('/')}>
        back
      </div>
      <p className='title'> Login</p>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="username" className='label'>Username </label>
          <input type="text" name="user" value={state.user} onChange={handleChange} className="input"></input>
        </div>
        <div>
          <label htmlFor="password" className='label'>Password </label>
          <input type="password" name="pass" value={state.pass} onChange={handleChange} className='input'></input>
        </div>
        <div>
          <button type="submit" className="submitbutton"> Submit</button>
         </div>
      </form>
    </div>
  );
}


export default LoginPage;