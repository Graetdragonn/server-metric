import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat, checkIfExists, removeServerFromList, removeServerFromUser, getAllClientServers } from './RemoveServerLogic';
//import Header from '../../components/navigation-bar/Header';
import NavBar from '../../components/navigation-bar/NavBar';
import * as Constants from "../../constants";

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

    // check if server is successfully removed
    const [serverRemoved, setServerRemoved] = useState(false);

    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');

    // server list for user
    const [serverList, setServerList] = useState([] as any[]);

    // get all servers
    const getServerList = async () => {
        var servers = await getAllClientServers(email);
        setServerList(servers);
    }
    getServerList();

    // submits form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // checks address format
        if (!checkServerFormat(server)){
            setError(true);
        }

        // checks if exists and can be removed
        else if (await checkIfExists(server)) { 
            if (await removeServerFromUser(email, server)) {
                setServerRemoved(true);
            }
            else {
                setServerError(true);
            }
        }
        // server removed from list and user
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
    <><NavBar />
    <body className='Form-Body'>
        <div>
            <form onSubmit={handleSubmit} style={{ display: serverRemoved ? 'none' : '' }}>
                <BackButton />
                <h1>Remove Server</h1>

                <div className="center">
                    <select onChange={handleChange}>
                        <option value="default"> - Select Server to Delete -</option>
                        {serverList.map(server => { return <option value={server.address}>{server.address}</option>; })}
                    </select>
                </div> 

                <button>Submit</button>
                <br />
                <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
                <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server already added to user  </span>
                </form>
                <form style={{ display: serverRemoved ? '' : 'none' }}>
                <BackButton />
                <h1>Remove Server</h1>

                <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully removed</p>

                <br />

                <button onClick={() => navigate(Constants.DASHBOARD_PAGE)}>Back to dashboard</button>
                <br />
            </form>
        </div>
    </body></>
    
    );
}

export default RemoveServerPage;