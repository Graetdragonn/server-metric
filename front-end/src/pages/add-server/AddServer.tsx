import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, addServerToList, addServerToUser } from './AddServerLogic';

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

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // checks address format
    if(!checkServerFormat(server)){
        setError(true);
    }

    // checks if server already exists
    else if(await checkIfExists(server)){
       await addServerToUser(globalThis.username, server);
    }
    else {
        await addServerToList(server);
        await addServerToUser(globalThis.username, server);
    }
  };

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setServer(e.target.value);
      };

  return (
    <body className='Form-Body'>
    <div>
    <form onSubmit={handleSubmit}>
    <BackButton></BackButton>
      <h1>Add Server</h1>

      <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>

      <br></br>
     
      <button>Submit</button>
      <br></br>
      <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
    </form>
    </div>
    </body>
    
  );
}

export default AddServerPage;