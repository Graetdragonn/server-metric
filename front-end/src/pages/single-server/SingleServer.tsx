import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import NavBar from "../../components/navigation-bar/NavBar";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { getReceivingPortsForAServer, getSentPortsForAServer } from "../dashboard/DashboardLogic";
const { getService } = require('port-numbers');

export default function SingleServer() {

    const location = useLocation(); // for screen navigation
    const { state } = location; // get props
    const [receivedPortList, setReceivedPortList] = useState([] as any[]); // tracks received ports
    let receivedPorts: string[]; // temporary variable for received ports
    const [sentPortList, setSentPortList] = useState([] as any[]); // tracks sent ports
    let sentPorts: string[]; // temporary variable for sent ports

    // tracks if port lists are not empty
    const [sentPortListHasData, setSentPortListHasData] = useState(Boolean)
    const [receivedPortListHasData, setReceivedPortListHasData] = useState(Boolean)

    useEffect(() => {
        // get server traffic
        async function getTraffic() {
            receivedPorts = await getReceivingPortsForAServer(state);
            setReceivedPortList(receivedPorts);
            sentPorts = await getSentPortsForAServer(state);
            setSentPortList(sentPorts);
            if (sentPortList.length >= 1) {
                setSentPortListHasData(true)
            } else {
                setSentPortListHasData(false)
            }
            if (receivedPortList.length >= 1) {
                setReceivedPortListHasData(true)
            } else {
                setReceivedPortListHasData(false)
            }
        }
        getTraffic();

    }, [sentPortList, receivedPortList]);
    
    // get port name
    const getPortName = (label: string) => {
        const number = getService(Number(getPort(label)));
        return "Name of Service: " + number.name;
    };

    // get port description
    const getPortDescription = (label: string) => {
        const number = getService(Number(getPort(label)));
        return "Description: " + number.description;
    };

    // get port
    const getPort = (port: string) => {
        return port.substring(port.indexOf(' ') + 1);

    }

    // tool for graph styling
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'white',
                    opacity: '0.9',
                    border: '1px solid black',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}>
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{"Packets Transferred: " + `${payload[0].value}`}</p>
                    <p className="intro">{getPortName(label)}</p>
                    <p className="intro">{getPortDescription(label)}</p>
                </div>
            );
        }

        return null;
    };

    // if no port data, render this
    const renderNoPortData = () => {
        return <h1> Servers Have No Port Data</h1>
    };


    return (
        <div className="Single-Server-Page">
            <NavBar />
            <div>
                <br />
                <div className="white-div-for-single-server" style={{ minWidth: 1000, maxHeight: 80, marginLeft: "19.5%" }}> <h1 className='Gradient-Text' style={{ textAlign: "center" }}> Server {state} </h1></div>
                <div className="white-div" style={{ width: 1000, marginLeft: "17%" }}>
                    <div style={{ display: !sentPortListHasData && !receivedPortListHasData ? 'none' : '' }}>
                        <BarChart height={300} width={1000} data={receivedPortList}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ports" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar name="Number Received on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
                        </BarChart>
                        <br />
                        <BarChart height={300} width={1000} data={sentPortList}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ports" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar name="Number Sent on Port" barSize={30} dataKey="numUsed" fill="#619E57" />
                        </BarChart>
                    </div>
                    <div style={{ display: sentPortListHasData && receivedPortListHasData ? 'none' : '' }}>
                        {renderNoPortData()}
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
