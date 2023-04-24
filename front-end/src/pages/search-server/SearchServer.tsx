import React, { useEffect, useState } from 'react';
import '../../style/Master.css';
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat } from '../add-server/AddServerLogic';
import NavBar from '../../components/navigation-bar/NavBar';
import { getAllServers, getClientsByProvider, getClientsServers, getServerInfo, getUserByEmail, sortServers } from '../../components/server-list/ServerListLogic';
import { getUsersOnServer, removeServerFromUser } from '../admin-single-server/AdminSingleServerLogic';
import { checkServerInList } from './SearchServerLogic'
import * as Constants from "../../constants";

/**
 * Search for server page
 */
export default function SearchServerPage() {
    // for screen navigation
    const navigate = useNavigate();

    // checks for errors
    const [error, setError] = useState(false);

    // checks for errors
    const [serverError, setServerError] = useState(false);

    // tracks server address
    const [serverDD, setServerDD] = useState("");
    const [serverI, setServerI] = useState("");

    //used for refreshing page data
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    // all servers
    const [serverList, setServerList] = useState([] as any[]);
    var servers = [] as any[]; // server list temp variable
    var clients = [] as string[]; // list of clients for service provider

    // get server list
    useEffect(() => {
        // get all servers
        const getServerList = async () => {
            var email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);

            // if user is an admin, then get all servers
            if (localStorage.getItem("userType") === "ADMIN") {
                servers = await getAllServers();
            }
            else if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
                var userInfo = await getUserByEmail(email);
                clients = await getClientsByProvider(userInfo);
                // get list of servers
                servers = await getClientsServers(clients);
            } else if (localStorage.getItem("userType") === "CLIENT") {
                clients = [email];
                // get list of servers
                servers = await getClientsServers(clients);
                servers = servers.slice(1);
            }
            // remove duplicates by casting to Set then back to Array
            setServerList(Array.from(new Set(servers)));

        }
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getServerList();

    }, [currentTime]);

    // go to single server page from dropdown option
    async function handleSubmitDD() {
        setError(false);
        setServerError(false);

        if (serverDD === '' || serverDD === 'default') {
            setError(true);
        }
        else {
            goToSingleServer(serverDD);
        }

    }

    // go to single server page from text input option
    async function handleSubmitI() {
        if (await checkServerInList(serverI, serverList)) {
            goToSingleServer(serverI);
        }
        else {
            setServerError(true);
        }
    }

    // navigate to single server page
    const goToSingleServer = async (address: string) => {
        var res = await getServerInfo(address);
        if (localStorage.getItem("userType") === "ADMIN") {
            navigate(Constants.ADMIN_SINGLE_SERVER_PAGE, { state: { serverInfo: res } });
        } else {
            navigate(Constants.SINGLE_SERVER_PAGE, { state: res["address"] });
        }
    }

    // to update server when user inputs server
    const handleChangeDD = (e: { target: { name: string; value: any; }; }) => {
        setServerDD(e.target.value);
        setError(false);
    };
    const handleChangeI = (e: { target: { name: string; value: any; }; }) => {
        setServerI(e.target.value);
    };

    if (localStorage.getItem("userType") === "SERVICE_PROVIDER") {
        return (
            <><NavBar />
                <div className='Form-Body'>
                    <div>
                        <form>
                            <BackButton />
                            <h1>Go to Server Page</h1>
                            <div className='center'>
                                <div>
                                    <select onChange={handleChangeDD}>
                                        <option value="default"> - Select Server -</option>
                                        {serverList.map(server => {
                                            return server.servers.map((address: any) => {
                                                return address.addresses.map((num: any) => {
                                                    return <option value={num.address} key={num.address}>{server.firstName} {server.lastName}; {num.address}</option>
                                                })
                                            })
                                        })}
                                    </select>
                                    <button type="button" onClick={handleSubmitDD}>Go</button>
                                    <br></br>
                                    <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Please select a server </span>
                                </div>
                                <br></br>
                                <div>
                                    <input type='text' onChange={handleChangeI} placeholder='Enter server address'></input>
                                    <button type="button" onClick={handleSubmitI}>Go</button>
                                </div>
                            </div>
                            <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server does not exist in your list of servers  </span>
                            <br />
                        </form>

                    </div>
                </div></>
        );
    }
    else if (localStorage.getItem("userType") !== 'SERVICE_MANAGER') {
        return (
            <><NavBar />
                <div className='Form-Body'>
                    <div>
                        <form>
                            <BackButton />
                            <h1>Go to Server Page</h1>
                            <div className='center'>
                                <div>
                                    <select onChange={handleChangeDD}>
                                        <option value="default"> - Select Server -</option>
                                        {serverList.map(server => { return <option key={server.address} value={server.address}>{server.address}</option>; })}
                                    </select>
                                    <button type="button" onClick={handleSubmitDD}>Go</button>
                                    <br></br>
                                    <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Please select a server </span>
                                </div>
                                <br></br>
                                <div>
                                    <input type='text' onChange={handleChangeI} placeholder='Enter server address'></input>
                                    <button type="button" onClick={handleSubmitI}>Go</button>
                                </div>
                            </div>
                            <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server does not exist in your list of servers  </span>
                            <br />
                        </form>

                    </div>
                </div></>

        );
    }
    return null;
}
