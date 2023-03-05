import React, { useState } from 'react';
import '../../style/Master.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/back-button/BackButton';
import { checkServerFormat } from '../add-server/AddServerLogic';
import Header from '../../components/navigation-bar/Header';
import { deleteServer } from './AdminDeleteServerLogic';
import { getAllServers } from '../../components/server-list/ServerListLogic';
import { getUsersOnServer, removeServerFromUser } from '../admin-single-server/AdminSingleServerLogic';

/**
 * Add server screen
 */
const AdminDeleteServerPage = () => {
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
    var users = new Array();

  // get all servers
  const getServerList = async () => {
    var servers = await getAllServers();
    setServerList(servers);
  }
  getServerList();

  // get users watching server
  const getUserList = async () => {
    users = await getUsersOnServer(server);
    setUserList(users);
  }
  getUserList();

  // submits form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        await removeServerFromUser(userList[i]["userEmail"], server);
      }
      if (await deleteServer(server)) {
        setServerDeleted(true);
      }
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
            <div className="center">
              <select onChange={handleChange}>
                <option value="default"> - Select Server to Delete -</option>
                {serverList.map(server => { return <option value={server.address}>{server.address}</option>; })}
              </select>
            </div> 
            <button>Submit</button>
            <br></br>
            <span style={{ visibility: error ? 'visible' : 'hidden' }} className='error'>&nbsp; Please select a server </span>
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