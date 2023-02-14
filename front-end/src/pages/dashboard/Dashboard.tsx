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

  return (
    <div className="Dashboard-Page">
      <Header />

      <button className='addServer' onClick={() => navigate('/addserver')}>Add Server</button>
    </div>
  );
};
  
export default DashboardPage;