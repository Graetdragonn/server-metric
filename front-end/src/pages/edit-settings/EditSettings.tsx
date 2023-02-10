import React, {useState} from "react";
import './EditSettings.css';
import BackButton from '../../components/back-button/BackButton';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, isEmpty, isTypeDefault, submit } from '../create-account/CreateAccountLogic';

const EditSettings = () => {
  const navigate = useNavigate();
   // user input for account creation
   const [state, setState] = useState({
    email: "dummyuser@gmail.com",
    first: "John",
    last: "Smith",
    pass: "********",
    confirmPass: "********",
    userType: "Admin"
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
const submitChange = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div>
      <BackButton></BackButton>
      <div>
      <form onSubmit={submitChange} className='form'>
        <div>
          <h1 className='title'> Edit Account Settings</h1>
          <div className="row"><label>Email/Username </label><input type="email" name="email" required={true} value={state.email} onChange={handleChange}></input></div>
          <div className="row"><label>First Name</label><input type="text" name="first" required={true} value={state.first} onChange={handleChange}></input></div>
          <div className="row"><label>Last Name</label><input type="text" name="last" required={true} value={state.last} onChange={handleChange}></input></div>
          <div className="row"><label>Password</label><input type="password" name="pass" required={true} value={state.pass} onChange={handleChange}></input></div>
          <div className="row"><label>Confirm Password&nbsp;&nbsp;</label><input type="password" name="confirmPass" required={true} value={state.confirmPass} onChange={handleChange}></input></div>
          <p style={{ visibility: passMatch ? 'hidden' : 'visible' }} className='error'>&nbsp; Passwords do not match </p>
          <div className="row"><label>User Type</label>
            <select onChange={(e) => setState({ ...state, userType: e.target.value })}>
              <option value="default">- select user type -</option>
              <option value="admin">Admin</option>
              <option value="servicemanager">Service Manager</option>
              <option value="serviceprovider">Service Provider</option>
              <option value="client">Client</option>
            </select>
          </div>
          <p style={{ visibility: roleSelected ? 'hidden' : 'visible' }} className='error'>&nbsp; No user type selected </p>
          <p style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>Email is already in use</p>
        </div>
        <div>
          <button type="submit" className="submitbutton"> Submit</button>
        </div>
      </form>
      </div>
    </div>


  );
}
  
export default EditSettings;