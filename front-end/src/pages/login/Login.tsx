import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, submit } from './LoginLogic';
import { checkEmail } from '../create-account/CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';

// Global variable to carry username accross screens
declare global{
  var username: string
}

/**
 * Login screen
 */
const LoginPage = () => {
  // for screen navigation
  const navigate = useNavigate();

  // user input for login
  const [state, setState] = useState({
    email: "",
    pass: ""
  });

  // checks for errors on login
  const [error, setError] = useState(false);

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verifies fields and logs user in
    if (checkEmail(state.email) && !checkEmpty(state.email) && !checkEmpty(state.pass)) {
      if(await submit(state.email, state.pass)){
        globalThis.username = state.email;
        navigate('/dashboard');
      }
      else{
        setError(true);
      }
    }
  };

  // handles forgot password
  const forgotPass = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/forgotpassword');
  };

  return (
    <body className='Form-Body'>
    <div>
    <form onSubmit={handleSubmit}>
    <BackButton></BackButton>
      <h1>Login</h1>

      <input placeholder='Email' type="text" required={true} name="email" value={state.email} onChange={handleChange}></input>

      <br></br>

      <input placeholder='Password' type="password" name="pass" required={true} value={state.pass} onChange={handleChange}>
      </input>
      <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email or password are incorrect</span>
      <br></br>
      <p className='forgotPass' onClick={forgotPass}>Forgot password?</p>
      <button>Submit</button>
    </form>
    </div>
    </body>
    
  );
}

export default LoginPage;