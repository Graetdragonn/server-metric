import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";
import { useEffect, useState } from "react";
import { getServerTraffic } from "./SingleServerLogic";

const SingleServer = () => {

  const location = useLocation();
  const { state } = location;
  const [trafficList, setTrafficList] = useState([] as any[]);
  var traffic: string[];

  useEffect(() => {
    async function getTraffic() {
      traffic = await getServerTraffic(state);
      setTrafficList(traffic);
    }
    getTraffic();
  }, [trafficList]);

  const renderTraffic = () => {
    return trafficList.map((event) => 

      <div className='div-for-single-address'>
        Date: {event.time.month}/{event.time.day}/{event.time.year} <br></br>
        Time: {event.time.hour}:{event.time.min} <br></br>
        Destination IP: {event.dstIP} <br></br>
        Source Port: {event.srcPort} <br></br>
        Destination Port: {event.dstPort}
      </div>
   
    );
  }

  const noTraffic = () => {
    return <p>No network traffic found for this server</p>
  }
  
  return (
    <div className="Single-Server-Page">
      <Header />
      <p className="title">Network traffic for server {state}</p>
      <div className='div-for-addresses'>
        <h1>Sent Packets</h1>
        {trafficList.length > 0 && renderTraffic()}
        {trafficList.length < 1 && noTraffic()}
      </div>
    </div>
  );
}
  
export default SingleServer;