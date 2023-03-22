import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";
import React, { useEffect, useState } from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getReceivingPortsForAServer, getSentPortsForAServer} from "../dashboard/DashboardLogic";

const SingleServer = () => {

  const location = useLocation();
  const { state } = location;
  const [receivedPortList, setReceivedPortList] = useState([] as any []);
  var receivedPorts: string[];
  const [sentPortList, setSentPortList] = useState([] as any []);
  var sentPorts: string[];

  useEffect(() => {
    async function getTraffic() {
      receivedPorts = await getReceivingPortsForAServer(state);
      setReceivedPortList(receivedPorts);
      sentPorts = await getSentPortsForAServer(state);
      setSentPortList(sentPorts);
    }
    getTraffic();

  }, [sentPortList, receivedPortList]);
  
  return (
    <div className="Single-Server-Page">
      <Header />
        <div>
            <br/>
            <div className="white-div-for-single-server" style={{minWidth: 1000, maxHeight:80, marginLeft: "19.5%"}}> <h1 className='Gradient-Text' style={{textAlign: "center"}}> Server {state} </h1></div>
            <div className="white-div" style={{width: 1000, marginLeft: "17%"}}>
            <BarChart  height={300} width={1000} data={receivedPortList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ports" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Number Received on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
            </BarChart>
                <br/>
            <BarChart  height={300} width={1000} data={sentPortList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ports" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Number Sent on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
            </BarChart>
            </div>

        </div>
    </div>
  );
}
  
export default SingleServer;