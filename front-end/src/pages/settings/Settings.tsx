import React, {useEffect, useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword, isEmpty, isTypeDefault, submitEdits} from './SettingsLogic';
import UserService from '../../requests/UserService';
import BackButton from '../../components/back-button/BackButton';
import NavBar from '../../components/navigation-bar/NavBar';

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('email') || '');
  
    // user input for account creation
    const [state, setState] = useState({
        email: "",
        first: "",
        last: "",
        pass: "",
        confirmPass: "",
        userType: "",
        servers: []
    });

    useEffect(() => {
      async function getUserInfo(email: string) {
        const userInfo = await UserService.getUserByEmail(email);
        var userData = JSON.parse(userInfo);
        setState({...state, "email": user, "pass": userData['password'],"confirmPass": userData['password'], "first": userData['userFirstName'], "last": userData['userLastName'], "userType": userData['userType'], "servers": userData['servers']});
      }
      getUserInfo(user);
    }, []);

    // tracks if user confirms password correctly
    const [passMatch, setPassMatch] = useState(true);

    // checks for errors on login
    const [error, setError] = useState(true);

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
          setError(true);
      }

      // verify fields and create account
      else if (checkEmail(state.email) && checkPassword(state.pass, state.confirmPass) && !isEmpty(state.email) &&
          !isEmpty(state.first) && !isEmpty(state.last) && !isEmpty(state.pass) &&
          !isEmpty(state.confirmPass) && !isTypeDefault(state.userType)) {
  
          if (await submitEdits(state.email, state.first, state.last, state.pass, state.userType, state.servers)) {
              setError(false);
          }
          else {
              setError(true);
          }
      }
  };


  return (
    <><NavBar />
    <div className='Form-Body'>
      <div>
        <form onSubmit={submitChange} style={{ display: error ? '' : 'none' }}>
          <BackButton></BackButton>
          <h1>Settings</h1>
          <label>First Name</label>
          <input type="text" name="first" required={true} value={state.first} onChange={handleChange} autoComplete='first-name'></input>
          <br></br>
          <label>Last Name</label>
          <input type="text" name="last" required={true} value={state.last} onChange={handleChange} autoComplete='last-name'></input>
          <br></br>
          <label>Change Password</label>
          <input name="pass" type = "password" onChange={handleChange} autoComplete='new-password'></input>
          <br></br>
          <label>Confirm Changed Password</label>
          <input name="confirmPass" type = "password" onChange={handleChange} autoComplete='new-password'></input>
          <br></br>
          <button>Submit</button>
          <br></br>
          <span style={{ visibility: passMatch ? 'hidden' : 'visible' }} className='error'>&nbsp; Passwords do not match </span>
        </form>
        <form style={{ display: error ? 'none' : '' }}>
          <p style={{ fontSize: 50, textAlign: 'center' }}>Updated settings were saved to account</p>
          <button onClick={() => navigate('/Dashboard')}>Dashboard</button>
        </form>
      </div>
    </div></>
  );
}
  
export default Settings;
