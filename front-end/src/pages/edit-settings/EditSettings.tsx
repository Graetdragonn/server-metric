import React, {useState} from "react";
import './EditSettings.css';
import { useNavigate } from "react-router-dom";
import { checkEmpty, submit } from '../settings/SettingsLogic';
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
      <p className='title'> Edit Account Settings</p>

      <div>
      <form onSubmit={submitChange} className='form'>
        <div>
        <p className='eheader'>General Information:</p>
        <p className='eheader2'>Username: dummyuser@gmail.com</p>
        <p className='eheader2'>Password: ********</p>
        <p className='eheader'>Notification Settings:</p>
        <p className='eheader2'>Email: dummyuser@gmail.com</p>
        <p className='eheader2'>Phone Number: 123-456-7890</p>
        </div>
      </form>
      </div>
      <div>
         <button type="submit" className="submitbutton" onClick={()=> navigate('/editSettings')}> Submit</button>
      </div>
    </div>


  );
}
  
export default EditSettings;