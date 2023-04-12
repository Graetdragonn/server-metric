import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import NavBar from "../../components/navigation-bar/NavBar";
import { isTypeDefault, checkEmail, isEmpty, checkPhone } from "../create-account/CreateAccountLogic";
import { submit } from "./AddUserLogic"

/**
 * Render add user page
 * @returns add user screen
 */
export default function AddUserPage() {

    // for screen navigation
    const navigate = useNavigate();

    // user input for account creation
    const [state, setState] = useState({
        email: "",
        phone: "",
        first: "",
        last: "",
        pass: " ",
        confirmPass: " ",
        userType: "",
        serviceProvider: ""
    });

    // tracks if user has selcted a user type
    const [roleSelected, setRoleSelected] = useState(true);

    // tracks if user has selcted a service provider
    const [spSelected, setspSelected] = useState(true);

    // checks if email is already in use
    const [email, setEmail] = useState(false);

    // checks for errors on submit
    const [submitted, setSubmitted] = useState(false);

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
        setRoleSelected(true);
        setspSelected(true);
        setEmail(false);
        setPhoneCheck(true);

        // check that user type is selected, show error if not
        if (isTypeDefault(state.userType)) {
            setRoleSelected(false);
        }

        // check that phone number is in correct format, show error if not
        else if (!checkPhone(state.phone)) {
            setPhoneCheck(false);
        }

        // verify fields and create account
        else if (checkEmail(state.email) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isTypeDefault(state.userType)) {

            if (await submit(state.email, state.phone, state.first, state.last, state.pass, state.userType)) {
                setSubmitted(true);
            }
            else {
                setEmail(true);
            }
        }
    };

    return (
        <><NavBar />
            <div className='Form-Body'>
                <div>
                    <form onSubmit={handleSubmit} style={{ display: submitted ? 'none' : '' }}>
                        <BackButton />
                        <h1>Create a New User</h1>
                        <input placeholder='Email' type="email" name="email" required={true} value={state.email} onChange={handleChange}></input>
                        <br />
                        <input placeholder='Phone Number (ex: 555-555-5555)' type="phone" name="phone" required={true} value={state.phone} onChange={handleChange} autoComplete="phone-number"></input>
                        <br />
                        <input placeholder='First Name' type="text" name="first" required={true} value={state.first} onChange={handleChange}></input>
                        <br />
                        <input placeholder='Last Name' type="text" name="last" required={true} value={state.last} onChange={handleChange}></input>
                        <br />
                        <div className="row" style={{ display: "flex" }}>
                            <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
                                <option value="default">- Select User Type -</option>
                                <option value="ADMIN">Admin</option>
                                <option value="SERVICE_MANAGER">Service Manager</option>
                                <option value="SERVICE_PROVIDER">Service Provider</option>
                                <option value="CLIENT">Client</option>
                            </select>
                            <br />
                        </div>
                        <button>Submit</button>
                        <span style={{ visibility: roleSelected ? 'hidden' : 'visible' }} className='error'>&nbsp; No user type selected </span>
                        <span style={{ visibility: email ? 'visible' : 'hidden' }} className='error'>Email is already in use</span>
                        <span style={{ visibility: phoneCheck ? 'hidden' : 'visible' }} className='error'>&nbsp; Phone number must be in 555-555-5555 format </span>
                        <span style={{ visibility: spSelected ? 'hidden' : 'visible' }} className='error'>&nbsp; No service provider selected </span>
                    </form>
                </div>
                <form onSubmit={handleSubmit} style={{ display: submitted ? '' : 'none' }}>
                    <p style={{ fontSize: 20, textAlign: 'center' }}>User {state.email} was successfully created</p>
                    <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
                </form>
            </div></>
    );

}
