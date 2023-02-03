import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, isEmpty, isTypeDefault, submit } from './CreateAccountLogic';

const CreateAccountPage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        first: "",
        last: "",
        pass: "",
        confirmPass: "",
        userType: ""
    });

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkEmail(state.email) && checkPassword(state.pass, state.confirmPass) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isEmpty(state.pass) &&
            !isEmpty(state.confirmPass) && !isTypeDefault(state.userType)) {
            submit(state.email, state.first, state.last, state.pass, state.userType);
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <div className="backbutton" onClick={() => navigate('/')}>
                back
            </div>
            <p className='title'> Create Account</p>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <div className="row"><label>Email </label><input type="email" name="email" value={state.email} onChange={handleChange}></input></div>
                    <div className="row"><label>First Name</label><input type="text" name="first" value={state.first} onChange={handleChange}></input></div>
                    <div className="row"><label>Last Name</label><input type="text" name="last" value={state.last} onChange={handleChange}></input></div>
                    <div className="row"><label>Password</label><input type="password" name="pass" value={state.pass} onChange={handleChange}></input></div>
                    <div className="row"><label>Confirm Password</label><input type="password" name="confirmPass" value={state.confirmPass} onChange={handleChange}></input></div>
                    <div className="row"><label>User Type</label>
                        <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
                            <option value="default">- select user type -</option>
                            <option value="admin">Admin</option>
                            <option value="servicemanager">Service Manager</option>
                            <option value="serviceprovider">Service Provider</option>
                            <option value="client">Client</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit" className="submitbutton"> Submit</button>
                </div>
            </form>
        </div>
    );
}


export default CreateAccountPage;