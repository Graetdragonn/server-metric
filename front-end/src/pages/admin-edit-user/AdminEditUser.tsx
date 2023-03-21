import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/back-button/BackButton';
import Header from '../../components/navigation-bar/Header';
import '../../style/Master.css';
// import { getServiceProviderList, addClientToServerProvider } from "../../pages/add-user/AddUserLogic";
import { checkServerFormat } from '../add-server/AddServerLogic';
import { checkIfServerInList } from './AdminEditUserLogic';
import { checkEmail, isEmpty } from '../create-account/CreateAccountLogic';
import { submitEdits } from '../settings/SettingsLogic';
// import { deleteServerProviderClientByEmail, getClientServiceProvider } from '../delete-user/DeleteUserLogic';
// import { getUserType } from '../login/LoginLogic';

const AdminEditUserPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { userInfo } = state;

    const [info, setInfo] = useState({
        email: userInfo['username'],
        first: userInfo['userFirstName'],
        last: userInfo['userLastName'],
        pass: userInfo['userPassword'],
        confirmPass: userInfo['userPassword'],
        userType: userInfo['userType'],
        servers: userInfo['servers'],
        sp: ""
    });

    const [serverToAddOrDelete, setServerToAddOrDelete] = useState("");

    const [addServerError, setAddServerError] = useState(false);
    const [serverFormatError, setServerFormatError] = useState(false);
    const [deleteServerError, setDeleteServerError] = useState(false);
    // const [serviceProvider, setServiceProvider] = useState("");
    // const [clientType, setClientType] = useState(false);

    // gets list of all service providers
    // var serviceProviders = new Array();
    // const [serviceProviderList, setServiceProviderList] = useState([] as any[]);

    const [userServersList, setUserServersList] = useState([] as any[]);

    // checks for errors
    const [error, setError] = useState(true);


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

        // // if user was a client but changed type
        // if (clientType && info.userType !== 'CLIENT') {
        //     await deleteServerProviderClientByEmail(info.sp, info.email);
        // }

        // // if user is already a client but changed service providers
        // else if (clientType && info.sp !== serviceProvider) {
        //     if (await deleteServerProviderClientByEmail(info.sp, info.email) !== "ERROR") {
        //         await addClientToServerProvider(serviceProvider, info.email);
        //     }
        //     else if (info.sp === "") {
        //         await addClientToServerProvider(serviceProvider, info.email);
        //     }
        // }

        // // if user type is changed to client
        // else if(info.userType === 'CLIENT' && !clientType) {
        //     setClientType(true);
        //     await addClientToServerProvider(serviceProvider, info.email);
        // }

        // update user account
        if (checkEmail(info.email) && !isEmpty(info.email) &&
            !isEmpty(info.first) && !isEmpty(info.last)) {
            if (await submitEdits(info.email, info.first, info.last, state.pass, info.userType, userServersList)) {
                setError(false);
            }
            else {
                setError(true);
            }
        }
    }

    // // get list of all service providers
    // const getServiceProviders = async () => {
    //     serviceProviders = await getServiceProviderList();
    //     setServiceProviderList(serviceProviders);
    // }
    // getServiceProviders();

//     // get service provider of client
//     const getSP = async () => {
//         if (await getUserType(info.email) === "CLIENT") {
//             setClientType(true);
//             var temp = await getClientServiceProvider(info.email);
//             setServiceProvider(temp);
//             setInfo({
//                 ...info,
//                 sp: temp
//             });
//         }
        
//   }
  
    // set server list array
    useEffect(() => {
        setUserServersList(userInfo['servers']);
        // getSP();
    }, []);

    return (
        <><Header />
            <body className='Form-Body' >
                <div>
                    <form onSubmit={handleSubmit} style={{ display: error ? '' : 'none'}} >
                        <BackButton></BackButton>
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
                        <br></br>
                        <label>Email</label>
                        <input type="text" name="last" required={true} value={info.email} onChange={handleChange}></input>
                        <br></br>
                        <label>User Type</label>
                        <div className="center">
                            <select value={info.userType} onChange={(e) => setInfo({ ...info, userType: e.target.value })}>
                                <option value="ADMIN">Admin</option>
                                <option value="SERVICE_MANAGER">Service Manager</option>
                                <option value="SERVICE_PROVIDER">Service Provider</option>
                                <option value="CLIENT">Client</option>
                            </select>
                            {/* <select value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)} style={{ display: info.userType === "CLIENT" ? '' : 'none' }}>
                                {serviceProviderList.map(user => { return <option value={user.username}>{user.userFirstName} {user.userLastName}</option>; })}
                            </select> */}
                        </div>
                        <label>Servers</label>
                        <div className="row" style={{ display: "flex" }}>
                        <table className='serverList' style={{ display: userServersList.length > 0 ? '' : 'none' }}>
                            {userServersList.map(addr => {
                                return (
                                    <tr onClick={() => setServerToAddOrDelete(addr.address)} key={addr.address} className="userRow">
                                        <td>{addr.address}</td>
                                    </tr>
                                )
                            })}
                        </table>
                        <table className='serverList' style={{ display: userServersList.length > 0 ? 'none' : '' }}>
                            <tr className="userRow">
                                <td>User has no servers</td>
                            </tr>
                        </table>
                        <div>
                        <input placeholder='Server Address' style={{height: 10, width:210}} value={serverToAddOrDelete} type="text" name ="serverToAdd" onChange={handleServerChange}></input>
                        <p className='error' style={{display: serverFormatError ? '' : 'none'}}>Please enter a valid server address</p>
                        <p className='error' style={{display: addServerError ? '' : 'none'}}>User already has this server</p>
                        <p className='error' style={{display: deleteServerError ? '' : 'none'}}>User does not have this server</p>
                        <br></br>
                        <button type="button" className="addServerButton" onClick={handleAddServer}>Add</button>
                        <button type="button" className="addServerButton" onClick={handleDeleteServer}>Delete</button>
                        </div>
                        </div>
                        <button type='submit'>Submit</button>
                        <br></br>
                    </form>
                    <form style={{ display: error ? 'none' : '' }}>
                        <p style={{ fontSize: 20, textAlign: 'center' }}>User {info.email} was updated</p>
                        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                    </form>
                </div>
            </body></>
    );
}

export default AdminEditUserPage;