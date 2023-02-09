import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkEmpty, emailCheck } from '../login/LoginLogic';

/**
 * Login screen
 */
const ForgotPasswordPage = () => {
  // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
  };

  // submits form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verifies fields and sends password reset email
    if (emailCheck(email) && !checkEmpty(email)) {
      setIsValidEmail(true);
      //navigate('/dashboard');
    }
  };

  return (
    <div>
      <BackButton></BackButton>
      <p className='title'>Forgot Password</p>
      <form onSubmit={handleSubmit} className='form' style={{display: isValidEmail ? 'none' : ''}}>
        <div>
        <p style={{fontSize:15, textAlign:'center'}}>Please submit your email to reset your password</p>
            <div className='center'>
            <input type="text" required={true} name="email" value={email} onChange={handleChange}>
            </input>
        </div>     
        </div>
        <div>
          <button type="submit" className="submitbutton"> Submit</button>
        </div>
      </form>
      <form onSubmit={handleSubmit} className='form' style={{display: isValidEmail ? '' : 'none'}}>
      <p style={{fontSize:15, textAlign:'center'}}>An email was sent to reset your password</p>
      </form>
    </div>
  );
}


export default ForgotPasswordPage;