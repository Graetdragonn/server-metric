import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, isEmpty, isTypeDefault, submit } from './CreateAccountLogic';
import BackButton from '../../components/back-button/BackButton';

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
    
    const [passMatch, setPassMatch] = useState(true);
    const [roleSelected, setRoleSelected] = useState(true);

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!checkPassword(state.pass, state.confirmPass)){
            setPassMatch(false);
        }
        if(isTypeDefault(state.userType)){
            setRoleSelected(false);
        }
        else if (checkEmail(state.email) && checkPassword(state.pass, state.confirmPass) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isEmpty(state.pass) &&
            !isEmpty(state.confirmPass) && !isTypeDefault(state.userType)) {
            submit(state.email, state.first, state.last, state.pass, state.userType);
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <BackButton></BackButton>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                <h1 className='title'> Create Account</h1>
                    <div className="row"><label>Email </label><input type="email" name="email" required={true} value={state.email} onChange={handleChange}></input></div>
                    <div className="row"><label>First Name</label><input type="text" name="first" required={true} value={state.first} onChange={handleChange}></input></div>
                    <div className="row"><label>Last Name</label><input type="text" name="last" required={true} value={state.last} onChange={handleChange}></input></div>
                    <div className="row"><label>Password</label><input type="password" name="pass" required={true} value={state.pass} onChange={handleChange}></input></div>
                    <div className="row"><label>Confirm Password&nbsp;&nbsp;</label><input type="password" name="confirmPass" required={true} value={state.confirmPass} onChange={handleChange}></input></div>
                    <p style = {{visibility: passMatch ? 'hidden' : 'visible'}} className='error'>&nbsp; Passwords do not match </p>
                    <div className="row"><label>User Type</label>
                        <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
                            <option value="default">- select user type -</option>
                            <option value="admin">Admin</option>
                            <option value="servicemanager">Service Manager</option>
                            <option value="serviceprovider">Service Provider</option>
                            <option value="client">Client</option>
                        </select>
                    </div>
                    <p style = {{visibility: roleSelected ? 'hidden' : 'visible'}}className='error'>&nbsp; No user type selected </p>
                </div>
                <div>
                    <button type="submit" className="submitbutton"> Submit</button>
                </div>
            </form>
        </div>
    );
}


export default CreateAccountPage;