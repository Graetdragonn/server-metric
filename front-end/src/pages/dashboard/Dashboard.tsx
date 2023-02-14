import { useEffect, useState } from 'react';
import '../../style/Master.css'
import Header from "../../components/navigation-bar/Header";
import { useNavigate } from 'react-router-dom';
import { getNumPacketsSentPerAddresses } from './DashboardLogic';
import { getServersByUser } from '../../components/navigation-bar/NavBarLogic';

const DashboardPage = () => {
  const navigate = useNavigate();

  // dictionary of packets sent per each address
  const [packetsPerIp, setPacketsPerIp] = useState(new Map<string, number>());
  const [userAddresses, setUserAddresses] = useState([] as string[]);

  // get data to render on screen immediately
  useEffect(() => {
    const getUserAddresses = async () => {
      setUserAddresses(await getServersByUser(username));
    };
    getUserAddresses();

    const getPacketsPerIp = async () => {
      setPacketsPerIp(await getNumPacketsSentPerAddresses(userAddresses));
    };
    getPacketsPerIp();    
  }, []);

  const renderPacketsPerAddress = () => {
    if (packetsPerIp.size) {
      packetsPerIp.forEach((address, numPackets) => {
        console.log(address + ' ' + numPackets);
        return <p>Address {address} has sent {numPackets} packets.</p>
      });
    } else {
      console.log("No addresses found.");
      return <p>No addresses found.</p>
    }
  };

  return (
    <div className="Dashboard-Page">
      <Header />
      <button className='addServer' onClick={() => navigate('/addserver')}>Add Server</button>
      <div>
        {renderPacketsPerAddress()}
      </div>
    </div>
  );
};
  
export default DashboardPage;