import React, { useEffect, useState } from 'react';
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';
import { getNumPacketsSentPerAddresses, getNumPacketsReceivedPerAddresses } from './DashboardLogic';
import { getServersByUser } from '../../components/navigation-bar/NavBarLogic';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [sentPacketsPerIp, setSentPacketsPerIp] = useState([] as any[]);
  const [receivedPacketsPerIp, setReceivedPacketsPerIp] = useState([] as any[]);
  const [userAddresses, setUserAddresses] = useState([] as string[]);
  const userType = localStorage.getItem('userType');
    let userInfo: string[];
    let sentPacketsPer: any[];
    let receivedPacketsPer: any[];

    // get data to render on screen immediately
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email') || '');
    
    async function getUserAddresses() {
      userInfo = await getServersByUser(email);
      setUserAddresses(userInfo);
      sentPacketsPer = await getNumPacketsSentPerAddresses(userAddresses);
      setSentPacketsPerIp(sentPacketsPer);
      receivedPacketsPer = await getNumPacketsReceivedPerAddresses(userAddresses);
      setReceivedPacketsPerIp(receivedPacketsPer);
    }

    if(userType !== "ADMIN"){
      getUserAddresses();
    }
    
  }, [sentPacketsPerIp, receivedPacketsPerIp]);

  const renderNoAddresses = () => {
    return <p>No addresses found.</p>
  };

  return (

    <div className="Dashboard-Page">
       <Header />
      {/* NON-ADMIN DASHBOARD VIEW */}
      <div  style={{  display: userType !== "ADMIN" ? '' : 'none' }}>

          <div className="white-div" style={{width: 1000}}>
              <h1>Server Settings</h1>
              <button onClick={() => navigate('/addserver')}>Add a Server</button>
              <button onClick={() => navigate('')}>Remove a Server</button>
          </div>
          <br/>

          <div className="white-div" style={{width: 1000}}>
          <BarChart  height={300} width={1000} data={sentPacketsPerIp}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data)=> {navigate("/single-server", {state: data.address})}} name="Number Of Packets Sent" barSize={30} dataKey="numPackets" fill="#619E57" />
          </BarChart>
              <br/>
          <BarChart height={300} width={1000} data={receivedPacketsPerIp}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data)=> {navigate("/single-server", {state: data.address})}} name="Number of Packets received" barSize={30} dataKey="numPackets" fill="#619E57" />
          </BarChart>
          </div>
      </div>

      {/* ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? 'none' : '' }}>
          <br/>
      <div className='row' style={{display: 'flex', justifyContent:'space-around'}}>

      <UserList></UserList>

      <ServerList></ServerList>

      <div className='div-for-admin-services'>
          <h1>Admin Services</h1>
          <button style={{width: 150}} onClick={() => navigate('/adduser')}>Add User</button>
          <button style={{width: 150}} onClick={() => navigate('/deleteuser')}>Delete User</button>
          <button style={{width: 150}} onClick={() => navigate('/adminaddserver')}>Add Server</button>
          <button style={{width: 150}} onClick={() => navigate('/admindeleteserver')}>Delete Server</button>
      </div>

      </div>
          <br/>
      
      </div>
    </div>
  );
};
  
export default DashboardPage;