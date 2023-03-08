import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";
import { useEffect, useState } from "react";
import {getReceivedServerTraffic, getSentServerTraffic} from "./SingleServerLogic";

const SingleServer = () => {

  const location = useLocation();
  const { state } = location;
  const [sentTrafficList, setSentTrafficList] = useState([] as any[]);
  const [receivedTrafficList, setReceivedTrafficList] = useState([] as any[]);
  var sentTraffic: string[];
  var receivedTraffic: string[];

  useEffect(() => {
    async function getTraffic() {
      sentTraffic = await getSentServerTraffic(state);
      setSentTrafficList(sentTraffic);
      receivedTraffic = await getReceivedServerTraffic(state);
      setReceivedTrafficList(receivedTraffic)
    }
    getTraffic();

  }, [sentTrafficList, receivedTrafficList]);

  const renderSentTraffic = () => {
    return sentTrafficList.map((event) =>

      <div className='div-for-single-address'>
        Date: {event.time.month}/{event.time.day}/{event.time.year} <br></br>
        Time: {event.time.hour}:{event.time.min}:{event.time.ms} <br></br>
          Source IP: {event.srcIP} <br></br>
        Destination IP: {event.dstIP} <br></br>
        Source Port: {event.srcPort} <br></br>
        Destination Port: {event.dstPort}
      </div>
   
    );
  }

    const renderReceivedTraffic = () => {
        return receivedTrafficList.map((event) =>

            <div className='div-for-single-address'>
                Date: {event.time.month}/{event.time.day}/{event.time.year} <br></br>
                Time: {event.time.hour}:{event.time.min}:{event.time.ms} <br></br>
                Source IP: {event.srcIP} <br></br>
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
        <div>
            <h1 className='Gradient-Text' style={{fontWeight: 900, textAlign: "center"}}> Network Traffic for Server {state}</h1>
            <div className="background-side-by-side-parent">
                <div className='background-side-by-side-first-child' style={{maxWidth: 700}}>
        <h1>Sent Packets</h1>
        {sentTrafficList.length > 0 && renderSentTraffic()}
        {sentTrafficList.length < 1 && noTraffic()}
      </div>
        <div className='background-side-by-side-child' style={{maxWidth: 700}}>
            <h1>Received Packets</h1>
            {sentTrafficList.length > 0 && renderReceivedTraffic()}
            {sentTrafficList.length < 1 && noTraffic()}
        </div>
        </div>
        </div>
    </div>
  );
}
  
export default SingleServer;