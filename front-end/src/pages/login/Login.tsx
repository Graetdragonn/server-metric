import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, submit } from './LoginLogic';
import { checkEmail } from '../create-account/CreateAccountLogic';

const LoginPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
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
    if (checkEmail(state.email) && !checkEmpty(state.email) && !checkEmpty(state.pass)) {
      submit(state.email, state.pass);
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <div className="backbutton" onClick={() => navigate('/')}>
        back
      </div>
      <p className='title'> Login</p>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <div className="row">
            <label>Email </label>
            <input type="text" name="email" value={state.email} onChange={handleChange}>
            </input>
          </div>
          <div className="row">
            <label>Password </label>
            <input type="text" name="pass" value={state.pass} onChange={handleChange}>
            </input>
          </div>
        </div>
        <div>
          <button type="submit" className="submitbutton"> Submit</button>
        </div>
      </form>
    </div>
  );
}


export default LoginPage;