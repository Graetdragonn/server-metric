import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, submit } from './LoginLogic';
import { checkEmail } from '../create-account/CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';

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
    <div>
      <BackButton></BackButton>
      <form onSubmit={handleSubmit} className='form'>
        <div>
        <p className='title'>Login</p>
          <div className="row">
            <label>Email </label>
            <input type="text" required={true} name="email" value={state.email} onChange={handleChange}>
            </input>
          </div>
          <div className="row">
            <label>Password&nbsp;&nbsp;</label>
            <input type="password" name="pass" required={true} value={state.pass} onChange={handleChange}>
            </input>
          </div>
        </div>
        <p style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email or password are incorrect</p>
        <div>
          
          <p className='forgotPass' onClick={forgotPass}>Forgot password?</p>
          
          <button type="submit" className="submitbutton"> Submit</button>
        </div>
      </form>
    </div>
  );
}


export default LoginPage;