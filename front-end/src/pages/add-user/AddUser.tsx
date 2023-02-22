import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import Header from "../../components/navigation-bar/Header";
import { isTypeDefault, checkEmail, isEmpty, submit } from "../create-account/CreateAccountLogic";
import { getServiceProviderList } from "./AddUserLogic";

const AddUserPage = () => {

    // for screen navigation
    const navigate = useNavigate();

    // user input for account creation
    const [state, setState] = useState({
        email: "",
        first: "",
        last: "",
        pass: "",
        confirmPass: "",
        userType: "",
        serviceProvider: ""
    });

    // gets list of all service providers
    var serviceProviders = new Array();
    const [serviceProviderList, setServiceProviderList] = useState([] as any[]);

    // tracks if user has selcted a user type
    const [roleSelected, setRoleSelected] = useState(true);

    // tracks if user has selcted a service provider
    const [spSelcted, setspSelected] = useState(true);

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

        // check that user type is selected, show error if not
        if (isTypeDefault(state.userType)) {
            setRoleSelected(false);
        }
        
        // check that service provider is selected if user is CLIENT, show error if not
        if (state.userType === "CLIENT" && isTypeDefault(state.serviceProvider)) {
            setspSelected(false);
        }

        // verify fields and create account
        else if (checkEmail(state.email) && !isEmpty(state.email) &&
            !isEmpty(state.first) && !isEmpty(state.last) && !isTypeDefault(state.userType)) {

            if (await submit(state.email, state.first, state.last, state.pass, state.userType)) {
                navigate('/dashboard');
            }
            else {
                setError(true);
            }
        }
    };

    // get list of all service providers
    const getServiceProviders = async () => {
        serviceProviders = await getServiceProviderList();
        setServiceProviderList(serviceProviders);
    }
    getServiceProviders();

    return (
        <><Header></Header><body className='Form-Body'>
            <div>
                <form onSubmit={handleSubmit}>
                    <BackButton></BackButton>
                    <h1>Create a New User</h1>
                    <input placeholder='Email' type="email" name="email" required={true} value={state.email} onChange={handleChange}></input>
                    <br></br>
                    <input placeholder='First Name' type="text" name="first" required={true} value={state.first} onChange={handleChange}></input>
                    <br></br>
                    <input placeholder='Last Name' type="text" name="last" required={true} value={state.last} onChange={handleChange}></input>
                    <br></br>
                    <div className="row">
                        <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
                            <option value="default">- Select User Type -</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SERVICE_MANAGER">Service Manager</option>
                            <option value="SERVICE_PROVIDER">Service Provider</option>
                            <option value="CLIENT">Client</option>
                        </select>
                        <br></br>
                        <select onChange={(e) => setState({ ...state, serviceProvider: e.target.value })} style={{display: state.userType === "CLIENT" ? '' : 'none'}}>
                            <option value="default"> - Select Service Provider -</option>
                            {serviceProviderList.map(user => {return <option value={user.userEmail}>{user.userFirstName} {user.userLastName}</option>;})} 
                        </select>
                    </div>
                    <button>Submit</button>
                    <span style={{ visibility: roleSelected ? 'hidden' : 'visible' }} className='error'>&nbsp; No user type selected </span>
                    <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email is already in use</span>
                    <span style={{ visibility: spSelcted ? 'hidden' : 'visible' }} className='error'>&nbsp; No service provider selected </span>
                </form>
            </div>
        </body></>
    );

}

export default AddUserPage;