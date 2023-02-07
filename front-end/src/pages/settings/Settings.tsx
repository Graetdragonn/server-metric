import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";

const Settings = () => {


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
         <button type="submit" className="editbutton" onClick={()=> navigate('/editsettings')}> Edit</button>
      </div>
    </div>


  );
}
  
export default Settings;
