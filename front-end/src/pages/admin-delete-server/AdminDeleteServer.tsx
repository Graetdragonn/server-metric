import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, addServerToList, addServerToUser } from '../add-server/AddServerLogic';
import Header from '../../components/navigation-bar/Header';
import { deleteServer } from './AdminDeleteServerLogic';

/**
 * Add server screen
 */
const AdminDeleteServerPage = () => {
  // for screen navigation
  const navigate = useNavigate();

  // tracks server address
  const [server, setServer] = useState("");

  // checks for errors
  const [error, setError] = useState(false);

  // checks for errors
  const [serverError, setServerError] = useState(false);

  // check if server is successfully added
  const [serverDeleted, setServerDeleted] = useState(false);

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setServerError(false);
    setServerDeleted(false)

    // checks address format
    if (!checkServerFormat(server)){
        setError(true);
    }

    else if (await deleteServer(server)) {
        setServerDeleted(true);
    }

    else {
        setServerError(true);
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
        <form onSubmit={handleSubmit} style={{ display: serverDeleted ? 'none' : '' }}>
          <BackButton></BackButton>
          <h1>Delete Server</h1>

          <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>

          <br></br>

          <button>Submit</button>
          <br></br>
          <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
          <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server does not exist  </span>
        </form>
        <form style={{ display: serverDeleted ? '' : 'none' }}>
          <BackButton></BackButton>
          <h1>Add Server</h1>

          <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully deleted</p>

          <br></br>

          <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
          <br></br>
        </form>
      </div>
    </body></>
    
  );
}

export default AdminDeleteServerPage;