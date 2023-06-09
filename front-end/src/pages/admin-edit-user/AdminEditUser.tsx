import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/back-button/BackButton';
import NavBar from '../../components/navigation-bar/NavBar';
import '../../style/Master.css';
// import { getServiceProviderList, addClientToServerProvider } from "../../pages/add-user/AddUserLogic";
import { checkServerFormat } from '../add-server/AddServerLogic';
import { checkIfServerInList } from './AdminEditUserLogic';
import { checkEmail, checkPhone, isEmpty } from '../create-account/CreateAccountLogic';
import { submitEdits } from '../settings/SettingsLogic';
import * as Constants from "../../constants";

/**
 * Render admin edit user screen
 * @returns Admin edit user page
 */
export default function AdminEditUserPage() {
    const navigate = useNavigate(); // for screen navigation
    const { state } = useLocation(); // to get props
    // checks if phone number is valid format
    const [phoneCheck, setPhoneCheck] = useState(true);

    // set user info from props
    const { userInfo } = state;
    const [info, setInfo] = useState({
        email: userInfo['username'],
        phone: userInfo['phoneNumber'],
        first: userInfo['userFirstName'],
        last: userInfo['userLastName'],
        pass: userInfo['userPassword'],
        confirmPass: userInfo['userPassword'],
        userType: userInfo['userType'],
        servers: userInfo['servers'],
        sp: ""
    });

    const [userServersList, setUserServersList] = useState([] as any[]); // tracks user's servers
    const [serverToAddOrDelete, setServerToAddOrDelete] = useState(""); // tracks which server to add or delete
    const [addServerError, setAddServerError] = useState(false); // tracks if error when adding server
    const [serverFormatError, setServerFormatError] = useState(false); // tracks if format error
    const [deleteServerError, setDeleteServerError] = useState(false); // tracks if error when deleting server
    const [error, setError] = useState(true); // checks for other errors


    // to update user information when user inputs data
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    // to update which server will be added or deleted
    const handleServerChange = (e: { target: { name: string; value: any }; }) => {
        setServerToAddOrDelete(e.target.value);
    }

    // add server to list
    const handleAddServer = async () => {
        var server = serverToAddOrDelete;
        setAddServerError(false);
        setDeleteServerError(false);
        setServerFormatError(false);
        // checks address format
        if (!checkServerFormat(server)) {
            setServerFormatError(true);
        }

        // check if server is already in list, if not then add
        else if (!checkIfServerInList(userServersList, server)) {
            addServer(server);
            setServerToAddOrDelete("");
        }

        // user already has server in list, send error
        else {
            setAddServerError(true);
        }
    }

    // add server helper function
    const addServer = (server: string) => {
        var newArray = info.servers.slice();
        newArray.push({ "address": server });
        setInfo({
            ...info,
            servers: newArray
        });
        setUserServersList(newArray);
    }

    // delete server from list
    const handleDeleteServer = async () => {
        var server = serverToAddOrDelete;

        // reset errors
        setAddServerError(false);
        setDeleteServerError(false);
        setServerFormatError(false);

        // checks address format
        if (!checkServerFormat(server)) {
            setServerFormatError(true);
        }

        // check if user has server in list, if exists then delete
        else if (checkIfServerInList(userServersList, server)) {
            deleteServer(server);
            setServerToAddOrDelete("");
        }

        // user doesn't have server in list, send error
        else {
            setDeleteServerError(true);
        }
    }

    // delete server helper function
    const deleteServer = (server: string) => {
        var newArray = info.servers.slice();
        newArray = newArray.filter((addr: { address: string; }) => addr.address !== server);
        setInfo({
            ...info,
            servers: newArray
        });
        setUserServersList(newArray);
    }

    // submits user changes
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // check that phone number is in correct format, show error if not
        if (!checkPhone(info.phone)) {
            setPhoneCheck(false);
        }

        // update user account
        else if (checkEmail(info.email) && !isEmpty(info.email) &&
            !isEmpty(info.first) && !isEmpty(info.last)) {
            if (await submitEdits(info.email, info.phone, info.first, info.last, state.pass, info.userType, userServersList)) {
                setError(false);
            }
            else {
                setError(true);
            }
        }
    }

    // set server list array
    useEffect(() => {
        setUserServersList(userInfo['servers']);
        // getSP();
    }, []);

    return (
        <><NavBar />
            <div className='Form-Body' >
                <div>
                    <form onSubmit={handleSubmit} style={{ display: error ? '' : 'none' }} >
                        <BackButton />
                        <h1>User Information</h1>
                        <div className="row" style={{ display: "flex" }}>
                            <div>
                                <label>First Name</label>
                                <input style={{ width: "80%" }} type="text" name="first" required={true} value={info.first} onChange={handleChange}></input>
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" name="last" required={true} value={info.last} onChange={handleChange}></input>
                            </div>
                        </div>
                        <br />
                        <label>Email</label>
                        <input type="text" name="last" required={true} value={info.email} onChange={handleChange}></input>
                        <br />
                        <label>Phone Number (ex: 555-555-5555)</label>
                        <input type="phone" name="phone" required={true} value={info.phone} onChange={handleChange} autoComplete="phone-number"></input>
                        <br />
                        <label>User Type</label>
                        <div className="center">
                            <select value={info.userType} onChange={(e) => setInfo({ ...info, userType: e.target.value })}>
                                <option value="ADMIN">Admin</option>
                                <option value="SERVICE_MANAGER">Service Manager</option>
                                <option value="SERVICE_PROVIDER">Service Provider</option>
                                <option value="CLIENT">Client</option>
                            </select>
                        </div>
                        <label>Servers</label>
                        <div className="row" style={{ display: "flex" }}>
                            <table className='serverList' style={{ display: userServersList.length > 0 ? '' : 'none' }}>
                                {userServersList.map(addr => {
                                    return (
                                        <tbody key={addr.address}>
                                            <tr onClick={() => setServerToAddOrDelete(addr.address)} className="userRow">
                                                <td>{addr.address}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                            <table className='serverList' style={{ display: userServersList.length > 0 ? 'none' : '' }}>
                                <tbody>
                                    <tr className="userRow">
                                        <td>User has no servers</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <input placeholder='Server Address' style={{ height: 10, width: 210 }} value={serverToAddOrDelete} type="text" name="serverToAdd" onChange={handleServerChange}></input>
                                <p className='error' style={{ display: serverFormatError ? '' : 'none' }}>Please enter a valid server address</p>
                                <p className='error' style={{ display: addServerError ? '' : 'none' }}>User already has this server</p>
                                <p className='error' style={{ display: deleteServerError ? '' : 'none' }}>User does not have this server</p>
                                <br />
                                <button type="button" className="addServerButton" onClick={handleAddServer}>Add</button>
                                <button type="button" className="addServerButton" onClick={handleDeleteServer}>Delete</button>
                            </div>
                        </div>
                        <button type='submit'>Submit</button>
                        <span style={{ visibility: phoneCheck ? 'hidden' : 'visible' }} className='error'>&nbsp; Phone number must be in 555-555-5555 format </span>
                        <br />
                    </form>
                    <form style={{ display: error ? 'none' : '' }}>
                        <p style={{ fontSize: 20, textAlign: 'center' }}>User {info.email} was updated</p>
                        <button onClick={() => navigate(Constants.DASHBOARD_PAGE)}>Dashboard</button>
                    </form>
                </div>
            </div></>
    );
}
