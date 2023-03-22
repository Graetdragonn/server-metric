import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import Header from "../../components/navigation-bar/Header";
import React, { useEffect, useState } from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getReceivingPortsForAServer, getSentPortsForAServer} from "../dashboard/DashboardLogic";

const {getService, getPort} = require('port-numbers');
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

    const getPortName = (label: string) => {
        const number = getService(Number(getPort(label)));
        const str = "Name of Service: " + number.name
        return str;
    };

    const getPortDescription = (label: string) => {
        const number = getService(Number(getPort(label)));
        const str = "Description: " + number.description
        return str;
    };

    const getPort = (port: string) => {
        const str = port.substring(port.indexOf(' ') + 1);
        return str;

    }


    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{backgroundColor: 'white',
                    opacity: '0.9',
                    border: '1px solid black',
                    borderRadius: '15px',
                    paddingLeft:'10px',
                    paddingRight:'10px'}}>
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{"Packets Transferred: " + `${payload[0].value}`}</p>
                    <p className="intro">{getPortName(label)}</p>
                    <p className="intro">{getPortDescription(label)}</p>
                </div>
            );
        }

        return null;
    };

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
                <Tooltip content={<CustomTooltip/>}/>
                <Legend />
                <Bar name="Number Received on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
            </BarChart>
                <br/>
            <BarChart  height={300} width={1000} data={sentPortList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ports" />
                <YAxis />
                <Tooltip  content={<CustomTooltip />}/>
                <Legend />
                <Bar name="Number Sent on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
            </BarChart>
            </div>

        </div>
    </div>
  );
}
  
export default SingleServer;