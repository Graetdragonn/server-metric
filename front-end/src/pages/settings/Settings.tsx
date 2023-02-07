import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';



const Settings = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="backbutton" onClick={() => navigate('/dashboard')}>
      back
      </div>
      <div>
        <p className='title'> Account Settings</p>
        <p className='header'>General Information:</p>
        <p className='header2'>Username: dummyuser@gmail.com</p>
        <p className='header2'>Password: ********</p>
        <p className='header'>Notification Settings:</p>
        <p className='header2'>Email: dummyuser@gmail.com</p>
        <p className='header2'>Phone Number: 123-456-7890</p>
      </div>
      <div>
         <button type="submit" className="editbutton" onClick={()=> navigate('/editsettings')}> Edit</button>
      </div>
    </div>


  );
}
  
export default Settings;
