import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, addServerToList, addServerToUser } from './AddServerLogic';
import NavBar from '../../components/navigation-bar/NavBar';
import * as Constants from "../../constants";

/**
 * Add server screen
 */
export default function AddServerPage() {
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

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // checks address format
    if (!checkServerFormat(server)) {
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
      if (await addServerToList(server)) {
        if (await addServerToUser(email, server)) {
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
    <><NavBar />
      <div className='Form-Body'>
        <div>
          <form onSubmit={handleSubmit} style={{ display: serverAdded ? 'none' : '' }}>
            <BackButton />
            <h1>Add Server</h1>

            <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>

            <br />

            <button>Submit</button>
            <br />
            <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
            <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server already added to user  </span>
          </form>
          <form style={{ display: serverAdded ? '' : 'none' }}>
            <BackButton />
            <h1>Add Server</h1>

            <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully added</p>

            <br />

            <button onClick={() => navigate(Constants.DASHBOARD_PAGE)}>Back to dashboard</button>
            <br />
          </form>
        </div>
      </div></>

  );
}
