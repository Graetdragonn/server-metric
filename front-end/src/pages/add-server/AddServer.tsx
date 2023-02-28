import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, addServerToList, addServerToUser } from './AddServerLogic';
import Header from '../../components/navigation-bar/Header';

// Global variable to carry username accross screens
declare global{
  var username: string
}

/**
 * Add server screen
 */
const AddServerPage = () => {
  // for screen navigation
  const navigate = useNavigate();


  // tracks server address
  const [server, setServer] = useState("");

  // checks for errors
  const [error, setError] = useState(false);

  // checks for errors
  const [serverError, setServerError] = useState(false);

  // check if server is successfully added
  const [serverAdded, setServerAdded] = useState(false);

  // get user email
  const email = JSON.parse(localStorage.getItem('email') || '');

    // get user type
    const userType = JSON.parse(localStorage.getItem('userType') || '');

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // checks address format
    if (!checkServerFormat(server)){
        setError(true);
    }

    // checks if server already exists
    else if (await checkIfExists(server)) {
      
       if (await addServerToUser(email, server)) {
           setServerAdded(true);
       }
       else {
            setServerError(true);
       }
    }
    // server added to list and to user
    else {
        if (await addServerToList(server)){
            if (await addServerToUser(email, server)){
                setServerAdded(true);
            }
            else {
                setServerError(true);
           }
        }
    }
  };

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setServer(e.target.value);
      };

  return (
    <><Header />
    <body className='Form-Body'>
      <div>
        <form onSubmit={handleSubmit} style={{ display: serverAdded ? 'none' : '' }}>
          <BackButton></BackButton>
          <h1>Add Server</h1>

          <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>

          <br></br>

          <button>Submit</button>
          <br></br>
          <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
          <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server already added to user  </span>
        </form>
        <form style={{ display: serverAdded ? '' : 'none' }}>
          <BackButton></BackButton>
          <h1>Add Server</h1>

          <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully added</p>

          <br></br>

          <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
          <br></br>
        </form>
      </div>
    </body></>
    
  );
}

export default AddServerPage;