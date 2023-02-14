import React, {useEffect, useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from './SettingsLogic';
import UserService from '../../requests/UserService';
import Header from "../../components/navigation-bar/Header";

const Settings = () => {
  const navigate = useNavigate();
  const user = globalThis.username;

  var [fName, setfName] = useState();
  var [password, setpassword] = useState();
  var [userType, setuserType] = useState();
  var [lastName, setlastName] = useState();


  useEffect(() => {
    async function getUserInfo(email: string) {
      const userInfo = await UserService.getUserByEmail(email);
      var userData = JSON.parse(userInfo);
      setpassword(userData['userPassword']);
      setuserType(userData['userType']);
      setfName(userData['userFirstName']);
      setlastName(userData['userLastName']); 
    }
    getUserInfo(user);
  }, []);


  return (
    <div className="Settings-Page">
        <Header />
        <p className='title'> Account Settings</p>
        <p className='header'>General Information:</p>
        <p className='header2'>Username: {user} </p>
        <p className='header2'>First Name: { fName } </p>
        <p className='header2'>Last Name: {lastName}</p>
        <p className='header2'>Password: {password}</p>
        <p className='header'>Notification Settings:</p>
        <p className='header2'>Email: {user}</p>
        <div>
          <button className="editbutton" onClick={()=> navigate('/editsettings')}> Edit</button>
        </div>
    </div>


  );
}
  
export default Settings;
