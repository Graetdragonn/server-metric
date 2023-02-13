import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, isEmpty, isTypeDefault, submit } from './CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';

/**
 * Create Account Screen
 */
const CreateAccountPage = () => {
    // for screen navigation
    const navigate = useNavigate();

    // user input for account creation
    const [state, setState] = useState({
        email: "",
        first: "",
        last: "",
        pass: "",
        confirmPass: "",
        userType: ""
    });

    // tracks if user confirms password correctly
    const [passMatch, setPassMatch] = useState(true);

    // tracks if user has selcted a user type
    const [roleSelected, setRoleSelected] = useState(true);

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

        // check that password is confirmed, show error if not
        if (!checkPassword(state.pass, state.confirmPass)) {
            setPassMatch(false);
        }

        // check that user type is selected, show error if not
        if (isTypeDefault(state.userType)) {
            setRoleSelected(false);
        }

        // verify fields and create account
        else if (checkEmail(state.email) && checkPassword(state.pass, state.confirmPass) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isEmpty(state.pass) &&
            !isEmpty(state.confirmPass) && !isTypeDefault(state.userType)) {

            if (await submit(state.email, state.first, state.last, state.pass, state.userType)) {
                navigate('/dashboard');
            }
            else {
                setError(true);
            }
        }
    };

    return (
      <body className='Form-Body'>
    <div>
    <form onSubmit={handleSubmit}>
    <BackButton></BackButton>
      <h1>Create Account</h1>
      

      <input placeholder='Email' type="email" name="email" required={true} value={state.email} onChange={handleChange}></input>
      <br></br>
      <input placeholder='First Name' type="text" name="first" required={true} value={state.first} onChange={handleChange}></input>
      <br></br>
      <input placeholder='Last Name' type="text" name="last" required={true} value={state.last} onChange={handleChange}></input>
      <br></br>
      <input placeholder='Password' type="password" name="pass" required={true} value={state.pass} onChange={handleChange}></input>
      <br></br>
      <input placeholder='Confirm password' type="password" name="confirmPass" required={true} value={state.confirmPass} onChange={handleChange}></input>
      <div className="row">
        <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
        <option value="default">- Select User Type -</option>
        <option value="admin">Admin</option>
        <option value="servicemanager">Service Manager</option>
        <option value="serviceprovider">Service Provider</option>
        <option value="client">Client</option>
        </select>
        </div>
      <button>Submit</button>
        <span style={{ visibility: passMatch ? 'hidden' : 'visible' }} className='error'>&nbsp; Passwords do not match </span>
        <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email or password are incorrect</span>
        <span style={{ visibility: roleSelected ? 'hidden' : 'visible' }} className='error'>&nbsp; No user type selected </span >
        <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email is already in use</span >
    </form>
    </div>
    </body>
    );
}


export default CreateAccountPage;