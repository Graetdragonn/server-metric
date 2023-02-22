import { useEffect, useState } from 'react';
import '../../style/Master.css'
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';
import { getNumPacketsSentPerAddresses } from './DashboardLogic';
import { getServersByUser } from '../../components/navigation-bar/NavBarLogic';
import UserList from '../../components/user-list/UserList';

const DashboardPage = () => {
  const navigate = useNavigate();

  // dictionary of packets sent per each address
  const [packetsPerIp, setPacketsPerIp] = useState([] as any[]);
  const [userAddresses, setUserAddresses] = useState([] as string[]);
  const userType = localStorage.getItem('userType');
  var userInfo: string[];
  var packetsPer: any[];

  // get data to render on screen immediately
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email') || '');
    
    async function getUserAddresses() {
      userInfo = await getServersByUser(email);
      setUserAddresses(userInfo);
      packetsPer = await getNumPacketsSentPerAddresses(userAddresses);
      setPacketsPerIp(packetsPer);
    }

    if(userType !== "ADMIN"){
      getUserAddresses();
    }
    
  }, [packetsPerIp]);

  const renderPacketsPerAddress = () => {
    return packetsPerIp.map((addr) => <div className='div-for-single-address'>Address {addr.address} has sent {addr.numPackets} packet(s)</div>);
  };

  const renderNoAddresses = () => {
    return <p>No addresses found.</p>
  };

  return (
    <div className="Dashboard-Page">
      <Header />
      {/* NON-ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? '' : 'none' }}>
        <br></br>
          <div className='div-for-addresses'>
            <h1>Server Packet Traffic</h1>
            {packetsPerIp.length > 0 && renderPacketsPerAddress()}
            {packetsPerIp.length < 1 && renderNoAddresses()}
        </div>
        <br></br>
        <div className='div-for-addresses'>
          <h1>Server Settings</h1>
        <button onClick={() => navigate('/addserver')}>Add Server</button>
        </div> 
      </div>
      {/* ADMIN DASHBOARD VIEW */}
      <div style={{ display: userType !== "ADMIN" ? 'none' : '' }}>
      <br></br>
      <UserList></UserList>
      <br></br>
      <div className='div-for-addresses'>
        <h1>User Services</h1>
        <button style={{width: 20}} onClick={() => navigate('/adduser')}>Add User</button>
        <button onClick={() => navigate('/deleteuser')}>Delete User</button>
        </div> 
      </div>
      
    </div>
  );
};
  
export default DashboardPage;