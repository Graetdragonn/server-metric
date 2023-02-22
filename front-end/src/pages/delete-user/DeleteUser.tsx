import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import Header from "../../components/navigation-bar/Header";
import { emailCheck, checkEmpty } from "../login/LoginLogic";
import { deleteUser } from "./DeleteUserLogic";


const DeleteUserPage = () => {
    // for screen navigation
  const navigate = useNavigate();

  // user input for email
  const [email, setEmail] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [error, setError] = useState(false);

  // to update user information when user inputs data
  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    setEmail(e.target.value);
  };

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verifies fields and deletes user by email
    if (emailCheck(email) && !checkEmpty(email)) {
        if(await deleteUser(email)){
            setIsValidEmail(true);
        }
        else {
            setError(true);
        }
    }
    
  };

  return (
<div className='Forgot-Password-Page'>
    <Header></Header>
    <body className='Form-Body'>
    <div>
    <form onSubmit={handleSubmit}  style={{display: isValidEmail ? 'none' : ''}}>
    <BackButton></BackButton>
      <h1>Delete a User</h1>
      <p style={{fontSize:15, textAlign:'center'}}>Please enter the email of the user to delete</p>
      <input placeholder='Email' type="text" required={true} name="email" value={email} onChange={handleChange}></input>
      <button>Submit</button>
      <br></br>
      <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>User does not exist</span>
    </form>
    <form onSubmit={handleSubmit} style={{display: isValidEmail ? '' : 'none'}}>
    <p style={{fontSize:20, textAlign:'center'}}>User {email} was successfully deleted</p>
    <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
    </form>
    </div>
    </body>
    </div>
  );
}

export default DeleteUserPage;