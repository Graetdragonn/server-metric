import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { getAllUserEmails, checkEmailInDatabase, generatePassword, updatePassword } from './ForgotPasswordLogic';
import * as Constants from "../../constants";
import emailjs from '@emailjs/browser';

/**
 * Forgot password screen
 */
export default function ForgotPasswordPage() {
  // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("");

  // email found in database
  const [emailInDatabase, setEmailInDatabase] = useState(true);

  // depends on if emailInDatabase == true, moves user to confirmation step if this variable is true
  const [isValidEmail, setIsValidEmail] = useState(false);

  // true if user confirms that email displayed on screen is correct, triggers email sent if true
  const [isConfirmed, setIsConfirmed] = useState(false);

  // true if the password reset was successful
  const [passResetSuccess, setPassResetSuccess] = useState(false);

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
  };

  // handles user input of email, checks if email input is in database
  const handleEmailSubmit = async (email: string) => {
    var users = await getAllUserEmails();
    var emailInDB = checkEmailInDatabase(users, email);
    setEmailInDatabase(emailInDB);

    if (emailInDB) {
      setIsValidEmail(true);
    }
  };

  // handles user declining email displayed for confirmation
  const handleIncorrectEmail = () => {
    setIsValidEmail(false);
    setIsConfirmed(false);
  };

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmed(true);

    const password = generatePassword();
    const templateParams = {
      to_email: email,
      new_password: password
    }

    // if password update is successful, then send the user an email
    if (await updatePassword(email, password)) {
      emailjs.send(Constants.EMAIL_SERVICE_ID, Constants.EMAIL_TEMPLATE_ID, templateParams, Constants.PUBLIC_KEY)
      .then((result) => {
          //console.log(result.text);
      }, (error) => {
          //console.log(error.text);
      });
      setPassResetSuccess(true);
    } else {
      setPassResetSuccess(false);
    }
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
            <p style={{ fontSize: 12, textAlign: 'center', color: 'red', display: emailInDatabase ? 'none' : ''}}>Email not found, please try again.</p>
            <p style={{ fontSize: 12, visibility: 'hidden', display: emailInDatabase ? '' : 'none'}}>.</p>
            <button type="button" onClick={() => handleEmailSubmit(email)}>Submit</button>
          </form>
          <form onSubmit={handleSubmit} style={{ display: (isValidEmail && !isConfirmed) ? '' : 'none' }}>
            <p style={{ fontSize: 30, textAlign: 'center' }}>Is this email correct?: {email}</p>
            <button type="submit">Yes</button>
            <button type="button" onClick={() => handleIncorrectEmail()}>No</button>
          </form>
          <form onSubmit={handleSubmit} style={{ display: (isValidEmail && isConfirmed) ? '' : 'none' }}>
            <p style={{ fontSize: 30, textAlign: 'center', display: passResetSuccess ? '' : 'none' }}>An email was sent to reset your password</p>
            <p style={{ fontSize: 30, textAlign: 'center', display: passResetSuccess ? 'none' : '' }}>An error occurred while resetting your password.<br /><br />Please try again later.</p>
            <button onClick={() => navigate(Constants.LOGIN_PAGE)}>Go to login</button>
          </form>

        </div>
      </div>
    </div>
  );
}
