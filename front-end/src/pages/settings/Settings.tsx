import React, { useState } from 'react';
//import './Settings.css';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import { getUserInfo } from './SettingsLogic';
import BackButton from '../../components/back-button/BackButton';



const Settings = () => {
  const navigate = useNavigate();
  const user = globalThis.username;
  getUserInfo(user);

  return (
    <div>
      <BackButton></BackButton>
      <div>
        <p className='title'> Account Settings</p>
        <p className='header'>General Information:</p>
        <p className='header2'>Username: dummyuser@gmail.com</p>
        <p className='header2'>First Name: John</p>
        <p className='header2'>Last Name: Smith</p>
        <p className='header2'>Password: ********</p>
        <p className='header'>Notification Settings:</p>
        <p className='header2'>Email: dummyuser@gmail.com</p>
        <p className='header2'>Phone Number: 123-456-7890</p>
      </div>
      <div>
         <button type="submit" className="submitbutton" onClick={()=> navigate('/editsettings')}> Edit</button>
      </div>
    </div>


  );
}
  
export default Settings;
