import React from "react";
import './Settings.css';
import { useNavigate } from "react-router-dom";


const Settings = () => {
  return (
    <div>
      <div className="backbutton">
      back
      </div>
      <p className='title'> Account Settings</p>

    <p className='header'>General Information:</p>
    <p className='header2'>Username: dummyuser@gmail.com</p>
    <p className='header2'>Password: ********</p>
    <p className='header'>Notification Settings:</p>
    <p className='header2'>Email: dummyuser@gmail.com</p>
    <p className='header2'>Phone Number: 123-456-7890</p>
    </div>


  );
}
  
export default Settings;