import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkEmpty, emailCheck } from '../login/LoginLogic';
import * as Constants from "../../constants";

/**
 * Forgot password screen
 */
export default function ForgotPasswordPage() {
  // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [isConfirmed, setIsConfirmed] = useState(false);

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
  };

  // handles user input of email
  const handleEmailSubmit = (email: string) => {
    // verifies fields, lets user confirm if email is correct
    if (emailCheck(email) && !checkEmpty(email)) {
      setIsValidEmail(true);
    }
  };

  // handles user declining email displayed for confirmation
  const handleIncorrectEmail = () => {
    setIsValidEmail(false);
    setIsConfirmed(false);
  };

  // submits form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send email here
    setIsConfirmed(true);
  };

  return (
    <div className='Forgot-Password-Page'>
      <div className='Form-Body'>
        <div>
          <form onSubmit={handleSubmit} style={{ display: isValidEmail ? 'none' : '' }}>
            <BackButton />
            <h1>Forgot Password</h1>
            <p style={{ fontSize: 15, textAlign: 'center' }}>Please submit your email to reset your password</p>
            <input placeholder='Email' type="text" required={true} name="email" value={email} onChange={handleChange}></input>
            <button type="button" onClick={() => handleEmailSubmit(email)}>Submit</button>
          </form>
          <form onSubmit={handleSubmit} style={{ display: (isValidEmail && !isConfirmed) ? '' : 'none' }}>
            <p style={{ fontSize: 30, textAlign: 'center' }}>Is this email correct?: {email}</p>
            <button type="submit">Yes</button>
            <button type="button" onClick={() => handleIncorrectEmail()}>No</button>
          </form>
          <form onSubmit={handleSubmit} style={{ display: (isValidEmail && isConfirmed) ? '' : 'none' }}>
            <p style={{ fontSize: 50, textAlign: 'center' }}>An email was sent to reset your password</p>
            <button onClick={() => navigate(Constants.LOGIN_PAGE)}>Go to login</button>
          </form>

        </div>
      </div>
    </div>
  );
}
