import React, {useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import Header from "../../components/navigation-bar/Header";

const Settings = () => {
  const navigate = useNavigate();


  return (
<div>
    <Header />
      <p className='title'> Account Settings</p>

      <p className='header'>General Information:</p>
      <p className='header2'>Username: dummyuser@gmail.com</p>
      <p className='header2'>Password: ********</p>
      <p className='header'>Notification Settings:</p>
      <p className='header2'>Email: dummyuser@gmail.com</p>
      <p className='header2'>Phone Number: 123-456-7890</p>
      <div>
         <button type="submit" className="submitbutton" onClick={()=> navigate('/editsettings')}> Edit</button>
      </div>
    </div>


  );
}
  
export default Settings;
