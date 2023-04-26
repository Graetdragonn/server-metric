import React, { useState, useRef } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkEmailInDatabase, generatePassword } from './ForgotPasswordLogic';
import { getAllUsers } from "../../components/user-list/UserListLogic";
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

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
  };

  // handles user input of email
  const handleEmailSubmit = async (email: string) => {
    // checks if email is in database, displays error message if email not found
    var users = await getAllUsers();

    setEmailInDatabase(checkEmailInDatabase(users, email));
    if (emailInDatabase) {
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

    const password = generatePassword();
    const templateParams = {
      to_email: email,
      new_password: password
    }

    // make call to server to update password for that user using the pass generated.
    // catch error if it doesn't work, then display that instead of sending the email.
    // so basically only send email if it works fine.

    emailjs.send(Constants.EMAIL_SERVICE_ID, Constants.EMAIL_TEMPLATE_ID, templateParams, Constants.PUBLIC_KEY)
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

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
            <p style={{ fontSize: 50, textAlign: 'center' }}>An email was sent to reset your password</p>
            <button onClick={() => navigate(Constants.LOGIN_PAGE)}>Go to login</button>
          </form>

        </div>
      </div>
    </div>
  );
}
