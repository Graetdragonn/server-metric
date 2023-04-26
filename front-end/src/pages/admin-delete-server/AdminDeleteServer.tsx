import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat } from '../add-server/AddServerLogic';
import NavBar from '../../components/navigation-bar/NavBar';
import { deleteServer } from './AdminDeleteServerLogic';
import { getAllServers } from '../../components/server-list/ServerListLogic';
import { getUsersOnServer, removeServerFromUser } from '../admin-single-server/AdminSingleServerLogic';
import * as Constants from "../../constants";

/**
 * Delete server screen
 */
export default function AdminDeleteServerPage() {

  // for screen navigation
  const navigate = useNavigate();

  // tracks server address
  const [server, setServer] = useState("");

  // all servers
  const [serverList, setServerList] = useState([] as any[]);

  // checks for errors
  const [error, setError] = useState(false);

  // checks for errors
  const [serverError, setServerError] = useState(false);

  // check if server is successfully added
  const [serverDeleted, setServerDeleted] = useState(false);

  // users on server
  const [userList, setUserList] = useState([] as any[]);
  var users = [] as any[];

  // get all servers
  const getServerList = async () => {
    var servers = await getAllServers();
    setServerList(servers);
  }
  getServerList();

  // get users watching server
  const getUserList = async () => {
    if (server !== "") {
      users = await getUsersOnServer(server);
      setUserList(users);
    }
  }
  getUserList();

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset errors
    setError(false);
    setServerError(false);
    setServerDeleted(false)

    // checks address format
    if (!checkServerFormat(server)) {
      setError(true);
    }

    // checks if users are watching server
    else if (userList.length > 0) {

      // remove server from user's lists
      for (let i = 0; i < userList.length; i++) {
        await removeServerFromUser(userList[i]["username"], server);
      }
      if (await deleteServer(server)) {
        setServerDeleted(true);
      }
    }
    // delete server
    else if (await deleteServer(server)) {
      setServerDeleted(true);
    }

    // an error occurred
    else {
      setServerError(true);
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
          <form onSubmit={handleSubmit} style={{ display: serverDeleted ? 'none' : '' }}>
            <BackButton />
            <h1>Delete Server</h1>
            <div className="center">
              <select onChange={handleChange}>
                <option value="default"> - Select Server to Delete -</option>
                {serverList.map(server => { return <option value={server.address}>{server.address}</option>; })}
              </select>
            </div>
            <button>Submit</button>
            <br />
            <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Please select a server </span>
            <span style={{ visibility: serverError ? 'visible' : 'hidden' }} className='error'>&nbsp; Server does not exist  </span>
          </form>
          <form style={{ display: serverDeleted ? '' : 'none' }}>
            <BackButton />
            <h1>Add Server</h1>

            <p style={{ fontSize: 40, textAlign: 'center' }}>Server successfully deleted</p>

            <br />

            <button onClick={() => navigate(Constants.DASHBOARD_PAGE)}>Back to dashboard</button>
            <br />
          </form>
        </div>
      </div></>

  );
}
