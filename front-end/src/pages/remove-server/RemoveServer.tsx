import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, removeServerFromList, removeServerFromUser } from './RemoveServerLogic';
import Header from '../../components/navigation-bar/Header';

/**
 * Remove server screen
 */
const RemoveServerPage = () => {
    // for screen navigation
    const navigate = useNavigate();


    // tracks server address
    const [server, setServer] = useState("");

    // checks for errors
    const [error, setError] = useState(false);

    // checks for errors
    const [serverError, setServerError] = useState(false);

    // check if server is successfully added
    const [serverRemoved, setServerRemoved] = useState(false);

    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');

    // submits form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // checks address format
        if (!checkServerFormat(server)){
            setError(true);
        }

        // checks if server already exists
        else if (await checkIfExists(server)) { 
            if (await removeServerFromUser(email, server)) {
                setServerRemoved(true);
            }
            else {
                setServerError(true);
            }
        }
        // server added to list and to user
        else {
            if (await removeServerFromList(server)){
                if (await removeServerFromUser(email, server)){
                    setServerRemoved(true);
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
            <form onSubmit={handleSubmit} style={{ display: serverRemoved ? 'none' : '' }}>
            <BackButton></BackButton>
            <h1>Remove Server</h1>

            <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>

            <br></br>

            <button>Submit</button>
            <br></br>
            <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
            <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server already added to user  </span>
            </form>
            <form style={{ display: serverRemoved ? '' : 'none' }}>
            <BackButton></BackButton>
            <h1>Remove Server</h1>

            <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully removed</p>

            <br></br>

            <button onClick={() => navigate('/dashboard')}>Back to dashboard</button>
            <br></br>
        </form>
        </div>
    </body></>
    
    );
}

export default RemoveServerPage;