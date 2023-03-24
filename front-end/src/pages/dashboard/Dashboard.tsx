import { useEffect, useState } from 'react';
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';
import {
  getNumPacketsSentPerAddressesClient,
  getNumPacketsReceivedPerAddressesClient,
  getNumPacketsSentPerAddressesSP, getNumPacketsReceivedPerAddressesSP,
} from './DashboardLogic';
import { getClientServersByUser, getServersByUser } from '../../components/navigation-bar/NavBarLogic';
import UserList from '../../components/user-list/UserList';
import ServerList from '../../components/server-list/ServerList';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Render dashboard page for each user type
 * @returns dashboard page depending on user type
 */
const DashboardPage = () => {
  const navigate = useNavigate(); // for screen navigation

  // track sent and received packets per IP - client
  const [sentPacketsPerIpClient, setSentPacketsPerIpClient] = useState([] as any[]);
  const [receivedPacketsPerIpClient, setReceivedPacketsPerIpClient] = useState([] as any[]);

  // track sent and received packets per IP - service provider
  const [sentPacketsPerIpSP, setSentPacketsPerIpSP] = useState([] as any[]);
  const [receivedPacketsPerIpSP, setReceivedPacketsPerIpSP] = useState([] as any[]);

  // track client packets sent and received data
  const [clientPacketsSentHasData, setClientPacketsSentHasData] = useState(Boolean);
  const [clientPacketsReceivedHasData, setClientPacketsReceivedHasData] = useState(Boolean);

  // track service provider packets sent and received data
  const [spPacketsSentHasData, setSPPacketsSentHasData] = useState(Boolean);
  const [spPacketsReceivedHasData, setSPPacketsReceivedHasData] = useState(Boolean);

  const [clientNames, setClientNames] = useState([] as any[]); // get clients' names
  const [userAddresses, setUserAddresses] = useState([] as string[]);   // track user's server addresses

  let userInfo: string[]; // user info

  // sent and received packets per client
  let sentPacketsPerClient: any[];
  let receivedPacketsPerClient: any[];

  // sent and received packets per service provider's clients
  let sentPacketsPerSP: any[];
  let receivedPacketsPerSP: any[];

  const email = JSON.parse(localStorage.getItem('email') || ''); // get user's email
  const userType = localStorage.getItem('userType'); // get user's type

  // get data to render on screen immediately
  useEffect(() => {

    async function getUserAddresses() {
      userInfo = await getServersByUser(email);
      setUserAddresses(userInfo);
      sentPacketsPerClient = await getNumPacketsSentPerAddressesClient(userAddresses);
      setSentPacketsPerIpClient(sentPacketsPerClient);
      receivedPacketsPerClient = await getNumPacketsReceivedPerAddressesClient(userAddresses);
      setReceivedPacketsPerIpClient(receivedPacketsPerClient);
      if (sentPacketsPerIpClient.length >= 1) {
        setClientPacketsSentHasData(true);
      } else {
        setClientPacketsSentHasData(false);
      }
      if (receivedPacketsPerClient.length >= 1) {
        setClientPacketsReceivedHasData(true);
      } else {
        setClientPacketsReceivedHasData(false);
      }

    }

    // get client's servers
    async function getClientAddresses() {
      userInfo = await getClientServersByUser(email);
      setClientNames(userInfo);
      sentPacketsPerSP = await getNumPacketsSentPerAddressesSP(clientNames);
      setSentPacketsPerIpSP(sentPacketsPerSP);
      receivedPacketsPerSP = await getNumPacketsReceivedPerAddressesSP(clientNames);
      setReceivedPacketsPerIpSP(receivedPacketsPerSP);
      if (sentPacketsPerIpSP.length >= 1) {
        setSPPacketsSentHasData(true)
      } else {
        setSPPacketsSentHasData(false)
      }
      if (receivedPacketsPerIpSP.length >= 1) {
        setSPPacketsReceivedHasData(true)
      } else {
        setSPPacketsReceivedHasData(false)
      }
    }

    if (userType == "CLIENT") {
      getUserAddresses();
    }

    if (userType == "SERVICE_PROVIDER") {
      getClientAddresses();
    }

  }, [sentPacketsPerIpClient, receivedPacketsPerIpClient, sentPacketsPerIpSP, receivedPacketsPerIpSP]);

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
      <Header />
      {/* CLIENT AND SERVICE PROVIDER DASHBOARD VIEW */}
      <div style={{ display: userType === "CLIENT" || userType === "SERVICE_PROVIDER" ? '' : 'none' }}>
        <br />
        <div className='side-menu'>
          <ServerList></ServerList>
          <button onClick={() => navigate('/addserver')}>Add a Server</button>
          <button onClick={() => navigate('')}>Remove a Server</button>
        </div>
        </div>
        <br />

        <div className="white-div" style={{ width: 1000, display: userType !== "CLIENT" ? 'none' : '' }}>
          <div style={{ display: !clientPacketsSentHasData && !clientPacketsReceivedHasData ? 'none' : '' }}>
            <BarChart height={300} width={1000} data={sentPacketsPerIpClient}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data) => { navigate("/single-server", { state: data.address }) }} name="Number Of Packets Sent" barSize={30} dataKey="numPackets" fill="#619E57" />
            </BarChart>
            <br />
            <BarChart height={300} width={1000} data={receivedPacketsPerIpClient}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="address" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data) => { navigate("/single-server", { state: data.address }) }} name="Number of Packets received" barSize={30} dataKey="numPackets" fill="#619E57" />
            </BarChart>
          </div>
          <div style={{ display: clientPacketsSentHasData && clientPacketsReceivedHasData ? 'none' : '' }}>
            {renderNoAddresses()}
          </div>
        </div>

        <div className="white-div" style={{ width: 1000, display: userType !== "SERVICE_PROVIDER" ? 'none' : '' }}>
          <div style={{ display: !spPacketsSentHasData && !spPacketsReceivedHasData ? 'none' : '' }}>
            <BarChart height={300} width={1000} data={sentPacketsPerIpSP}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis name="Client and Address" dataKey="userAndAddress" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number Of Packets Sent" barSize={30} dataKey="numPackets" fill="#619E57" />
            </BarChart>
            <br />
            <BarChart height={300} width={1000} data={receivedPacketsPerIpSP}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis name="Client and Address" dataKey="userAndAddress" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number of Packets received" barSize={30} dataKey="numPackets" fill="#619E57" />
            </BarChart>
          </div>
          <div style={{ display: spPacketsSentHasData && spPacketsReceivedHasData ? 'none' : '' }}>
            {renderNoAddresses()}
          </div>
        </div>



      {/* ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? 'none' : '' }}>
        <br />
        <div className='white-div'>

          <div className='side-menu'>
            <ServerList></ServerList>
          </div>
          <div style={{ marginTop: '20px' }}>
            <UserList></UserList>
          </div>
          <br />
          <div className='div-for-admin-services'>
            <h1>Admin Services</h1>
            <button style={{ width: 150 }} onClick={() => navigate('/adduser')}>Add User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/deleteuser')}>Delete User</button>
            <button style={{ width: 150 }} onClick={() => navigate('/adminaddserver')}>Add Server</button>
            <button style={{ width: 150 }} onClick={() => navigate('/admindeleteserver')}>Delete Server</button>
          </div>

        </div>
        <br />
      </div>

      {/* SERVICE MANAGER DASHBOARD VIEW */}
      <div style={{ display: userType === "SERVICE_MANAGER" ? '' : 'none' }}>
        <br></br>
        <div style={{marginTop: '50px'}}></div>
        <div className='row' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <UserList></UserList>
        </div>
        <br></br>
      </div>

    </div>
  );
};

export default DashboardPage;