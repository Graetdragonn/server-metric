import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, checkPhone, isEmpty, isTypeDefault, submit } from './CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';
import * as Constants from "../../constants";

/**
 * Create Account Screen
 */
export default function CreateAccountPage() {
    // for screen navigation
    const navigate = useNavigate();

    // user input for account creation
    const [state, setState] = useState({
        email: "",
        phone: "",
        first: "",
        last: "",
        pass: "",
        confirmPass: "",
        userType: "ADMIN"
    });

    // tracks if user confirms password correctly
    const [passMatch, setPassMatch] = useState(true);

    // checks for errors on login
    const [error, setError] = useState(false);

    // checks if phone number is valid format
    const [phoneCheck, setPhoneCheck] = useState(true);

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
        // check that password is confirmed, show error if not
        if (!checkPassword(state.pass, state.confirmPass)) {
            setPassMatch(false);
        }
        
        // check that phone number is in correct format, show error if not
        else if (!checkPhone(state.phone)) {
            setPhoneCheck(false);
        }

        // verify fields and create account
        else if (checkEmail(state.email) && checkPassword(state.pass, state.confirmPass) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isEmpty(state.pass) &&
            !isEmpty(state.confirmPass) && !isTypeDefault(state.userType)) {

            if (await submit(state.email, state.phone, state.first, state.last, state.pass, state.userType)) {
                localStorage.setItem("email", JSON.stringify(state.email));
                localStorage.setItem("userType", state.userType);
                navigate(Constants.DASHBOARD_PAGE);
            }
            else {
                setError(true);
            }
        }
    };

    return (
        <div className='Form-Body'>
            <div>
                <form onSubmit={handleSubmit}>
                    <BackButton />
                    <h1>Create Account</h1>
                    <input placeholder='Email' type="email" name="email" required={true} value={state.email} onChange={handleChange} autoComplete="email"></input>
                    <br />
                    <input placeholder='Phone Number (ex: 555-555-5555)' type="phone" name="phone" required={true} value={state.phone} onChange={handleChange} autoComplete="phone-number"></input>
                    <br />
                    <input placeholder='First Name' type="text" name="first" required={true} value={state.first} onChange={handleChange} autoComplete="first-name"></input>
                    <br />
                    <input placeholder='Last Name' type="text" name="last" required={true} value={state.last} onChange={handleChange} autoComplete="last-name"></input>
                    <br />
                    <input placeholder='Password' type="password" name="pass" required={true} value={state.pass} onChange={handleChange} autoComplete="new-password"></input>
                    <br />
                    <input placeholder='Confirm password' type="password" name="confirmPass" required={true} value={state.confirmPass} onChange={handleChange} autoComplete="new-password"></input>
                    <button>Submit</button>
                    <span style={{ visibility: passMatch ? 'hidden' : 'visible' }} className='error'>&nbsp; Passwords do not match </span>
                    <span style={{ visibility: phoneCheck ? 'hidden' : 'visible' }} className='error'>&nbsp; Phone number must be in 555-555-5555 format </span>
                    <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email is already in use</span >
                </form>
            </div>
        </div>
    );
}
