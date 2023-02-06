import React, {useState} from "react";
import './Settings.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, submit } from './SettingsLogic';
import { checkEmail } from '../create-account/CreateAccountLogic';




const EditSettings = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    pass: ""
  });
    const submitChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkEmail(state.email) && !checkEmpty(state.email) && !checkEmpty(state.pass)) {
            submit(state.email, state.pass);
            navigate('/dashboard');
        }
    };
  return (
    <div>
      <div className="backbutton" onClick={() => navigate('/settings')}>
      back
      </div>
      <div>
      <form onSubmit={submitChange} className='form'>
        <p className='title'> Account Settings</p>
        <p className='header'>General Information:</p>
        <p className='header2'>Username: dummyuser@gmail.com</p>
        <p className='header2'>Password: ********</p>
        <p className='header'>Notification Settings:</p>
        <p className='header2'>Email: dummyuser@gmail.com</p>
        <p className='header2'>Phone Number: 123-456-7890</p>
        </form>
      </div>
      <div>
         <button type="submit" className="editbutton" onClick={()=> navigate('/editSettings')}> Edit</button>
      </div>
    </div>


  );
}
  
export default EditSettings;