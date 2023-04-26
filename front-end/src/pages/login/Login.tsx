import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, getUserType, submit } from './LoginLogic';
import { checkEmail } from '../create-account/CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';
import * as Constants from "../../constants";

/**
 * Login screen
 */
export default function LoginPage() {
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
      if (await submit(state.email, state.pass)) {
        localStorage.setItem("email", JSON.stringify(state.email));
        localStorage.setItem("userType", await getUserType(JSON.parse(localStorage.getItem('email') || '')));
        navigate(Constants.DASHBOARD_PAGE);
      }
      else {
        setError(true);
      }
    }
  };

  // handles forgot password
  const forgotPass = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate(Constants.FORGOT_PASSWORD_PAGE);
  };

  return (
    <div className='Form-Body'>
      <div>
        <form onSubmit={handleSubmit}>
          <BackButton />
          <h1>Login</h1>

          <input placeholder='Email' type="text" required={true} name="email" value={state.email} onChange={handleChange} autoComplete="email"></input>
          <br />
          <input placeholder='Password' type="password" name="pass" required={true} value={state.pass} onChange={handleChange} autoComplete="current-password"></input>
          <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email or password are incorrect</span>
          <br />
          <p className='forgotPass' onClick={forgotPass}>Forgot password?</p>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
