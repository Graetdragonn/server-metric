import { useEffect, useState } from 'react';
import '../../style/Master.css'
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';
import { getNumPacketsSentPerAddresses } from './DashboardLogic';
import { getServersByUser } from '../../components/navigation-bar/NavBarLogic';

const DashboardPage = () => {
  const navigate = useNavigate();

  // dictionary of packets sent per each address
  const [packetsPerIp, setPacketsPerIp] = useState([] as any[]);
  const [userAddresses, setUserAddresses] = useState([] as string[]);
  var userInfo: string[];
  var packetsPer: any[];

  // get data to render on screen immediately
  useEffect(() => {
    async function getUserAddresses() {
      const email = JSON.parse(localStorage.getItem('email') || '');
      userInfo = await getServersByUser(email);
      setUserAddresses(userInfo);
      packetsPer = await getNumPacketsSentPerAddresses(userAddresses);
      setPacketsPerIp(packetsPer);
    }
    getUserAddresses();
  }, [packetsPerIp]);

  const renderPacketsPerAddress = () => {
    // if (packetsPerIp.size) {
    //   // forEach(value, key)
      
    //   packetsPer.forEach((numPackets, address) => {
    //    // console.log(address + ' ' + numPackets);
    //     //alert("Address "+ address +" has sent " + numPackets + " packets.");
    //     alert(numPackets + " " + address);
    //     return <p>Address {address} has sent {numPackets} packets.</p>

    //   });
      
    // } else {
    //   console.log("No addresses found.");
    //   return <p>No addresses found.</p>
    // }
    return packetsPerIp.map((addr) => <div className='div-for-single-address'>Address {addr.address} has sent {addr.numPackets} packet(s)</div>);
  };

  const renderNoAddresses = () => {
    return <p>No addresses found.</p>
  };

  return (
    <div className="Dashboard-Page">
      <Header />
     
      <div>
        <br></br>
          <div className='div-for-addresses '>
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
    </div>
  );
};
  
export default DashboardPage;