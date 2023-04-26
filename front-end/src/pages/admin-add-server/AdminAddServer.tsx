import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { addServerToList, checkServerFormat } from '../add-server/AddServerLogic';
import NavBar from '../../components/navigation-bar/NavBar';
import * as Constants from "../../constants";

/**
 * Add server screen
 */
export default function AdminAddServerPage() {
    // for screen navigation
    const navigate = useNavigate();

    // tracks server address
    const [info, setInfo] = useState({
        server: "",
        serverName: ""
    });

    // checks for errors
    const [error, setError] = useState(false);

    // checks for errors
    const [serverError, setServerError] = useState(false);

    // check if server is successfully added
    const [serverDeleted, setServerAdded] = useState(false);

    // submits form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // reset errors
        setError(false);
        setServerError(false);
        setServerAdded(false)

        // checks address format
        if (!checkServerFormat(info.server)) {
            setError(true);
        }

        // add server to list
        else if (await addServerToList(info.server)) {
            setServerAdded(true);
        }
         // an errror occurred
        else {
            setServerError(true);
        }
    };

    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <><NavBar />
            <div className='Form-Body'>
                <div>
                    <form onSubmit={handleSubmit} style={{ display: serverDeleted ? 'none' : '' }}>
                        <BackButton />
                        <h1>Add Server</h1>
                        <input placeholder='Server Address' type="text" required={true} name="server" onChange={handleChange}></input>
                        <br />

                        <button>Submit</button>
                        <br />
                        <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Not valid address format </span>
                        <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server already exists  </span>
                    </form>
                    <form style={{ display: serverDeleted ? '' : 'none' }}>
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
