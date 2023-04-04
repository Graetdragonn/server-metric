import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navigation-bar/NavBar";
import { useNavigate } from 'react-router-dom';
import {
  getServersByUser,
  getClientServersByUser,
  getNumPacketsSentAndReceivedClient,
  getNumPacketsSentAndReceivedSP
} from './DashboardLogic';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Render dashboard page for each user type
 * @returns dashboard page depending on user type
 */
export default function DashboardPage() {
  const navigate = useNavigate(); // for screen navigation

  // track sent and received packets per IP - client
  const [allPacketsPerIpClient, setAllPacketsPerIpClient] = useState([] as any[]);

  // track sent and received packets per IP - service provider
  const [allPacketsPerIpSP, setAllPacketsPerIpSP] = useState([] as any[]);

  // track client packets sent and received data
  const [clientPacketsHasData, setClientPacketsHasData] = useState(Boolean);

  // track service provider packets sent and received data
  const [spPacketsHasData, setSPPacketsHasData] = useState(Boolean);

  const [clientNames, setClientNames] = useState([] as any[]); // get clients' names
  const [userAddresses, setUserAddresses] = useState([] as string[]);   // track user's server addresses

  let userInfo: string[]; // user info

  // sent and received packets per client
  let allPacketsPerClient: any[];

  // sent and received packets per service provider's clients
  let allPacketsPerSP: any[];

  const email = JSON.parse(localStorage.getItem('email') || ''); // get user's email
  const userType = localStorage.getItem('userType'); // get user's type

  // get data to render on screen immediately
  useEffect(() => {

    async function getUserAddresses() {
      userInfo = await getServersByUser(email);
      setUserAddresses(userInfo);
      allPacketsPerClient = await getNumPacketsSentAndReceivedClient(userAddresses);
      setAllPacketsPerIpClient(allPacketsPerClient);
      if (allPacketsPerClient.length >= 1) {
        setClientPacketsHasData(true);
      } else {
        setClientPacketsHasData(false);
      }

    }

    // get client's servers
    async function getClientAddresses() {
      userInfo = await getClientServersByUser(email);
      setClientNames(userInfo);
      allPacketsPerSP = await getNumPacketsSentAndReceivedSP(clientNames);
      setAllPacketsPerIpSP(allPacketsPerSP);
      if (allPacketsPerIpSP.length >= 1) {
        setSPPacketsHasData(true)
      } else {
        setSPPacketsHasData(false)
      }
    }

    if (userType === "CLIENT") {
      getUserAddresses();
    }

    if (userType === "SERVICE_PROVIDER") {
      getClientAddresses();
    }

  }, [allPacketsPerIpClient, allPacketsPerIpSP]);

  // no data found render
  const renderNoAddresses = () => {
    return <h1> Servers Have No Sent Data</h1>
  };

  // get address from user and server
  const getAddressFromUserAndAddress = (userAndAddress: string) => {
    return userAndAddress.substring(userAndAddress.indexOf(' ') + 1);
  }

  return (

    <div className="Dashboard-Page">
      <NavBar />
      {/* CLIENT AND SERVICE PROVIDER DASHBOARD VIEW */}
      <div style={{ display: userType === "CLIENT" || userType === "SERVICE_PROVIDER" ? '' : 'none' }}>
        <br />
        <div className='side-menu'>
          <ServerList />
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none'}} onClick={() => navigate('/addserver')}>Add a Server</button>
          <button className="server-list-button" style={{ display: userType === "CLIENT" ? '' : 'none' }} onClick={() => navigate('/removeserver')}>Remove a Server</button>
        </div>
      </div>
      <br />

      <div className="white-div" style={{ width: 1400, display: userType !== "CLIENT" ? 'none' : '' }}>
        <div style={{ display: !clientPacketsHasData? 'none' : '' }}>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "33%",  textDecoration: "underline" }}> Graph of Packets Sent and Received through each Server</h3>
          <BarChart height={500} width={1400} data={allPacketsPerIpClient}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="address" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar onClick={(data) => { navigate("/single-server", { state: data.address }) }} name="Number of Packets Sent" barSize={30} dataKey="numPacketsSent" fill= "var(--orange_wheel)" />
            <Bar onClick={(data) => { navigate("/single-server", { state: data.address }) }} name="Number of Packets Received" barSize={30} dataKey="numPacketsReceived" fill= "var(--some_purple)" />
          </BarChart>
          <br />
        </div>
        <div style={{ display: clientPacketsHasData? 'none' : '' }}>
          {renderNoAddresses()}
        </div>
      </div>

      <div className="white-div" style={{ width: 1400, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
        <div style={{ display: !spPacketsHasData ? 'none' : '' }}>
          <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "31%",  textDecoration: "underline" }}> Graph of Packets Sent/Received through Different Client Servers</h3>
          <BarChart height={500} width={1400} data={allPacketsPerIpSP}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis name="Client and Address" dataKey="userAndAddress" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number of Packets Sent" barSize={30} dataKey="sentPackets" fill = "var(--orange_wheel)" />
            <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number of Packets Received" barSize={30} dataKey="receivedPackets" fill= "var(--some_purple)" />
          </BarChart>
          <br />
        </div>
        <div style={{ display: spPacketsHasData ? 'none' : '' }}>
          {renderNoAddresses()}
        </div>
      </div>



      {/* ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? 'none' : '' }}>
        <br />
        <div className='white-div'>
          <div className='side-menu'>
            <ServerList />
          </div>
          <div className='div-for-admin-services'>
            <h1>Admin Services</h1>
            <button style={{ width: 150 }} onClick={() => navigate('/adduser')}>Add User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/deleteuser')}>Delete User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/adminaddserver')}>Add Server</button>
            <button style={{ width: 150 }} onClick={() => navigate('/admindeleteserver')}>Delete Server</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <UserList />
          </div>
          <br />
          
        </div>
        <br />
      </div>

      {/* SERVICE MANAGER DASHBOARD VIEW */}
      <div style={{ display: userType === "SERVICE_MANAGER" ? '' : 'none' }}>
        <br />
        <div style={{marginTop: '50px'}} />
        <div className='row' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UserList />
        </div>
        <br />
      </div>

    </div>
  );
};
