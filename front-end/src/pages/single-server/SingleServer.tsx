import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import NavBar from "../../components/navigation-bar/NavBar";
import React, { useEffect, useState } from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getPortTrafficForAServer,} from "./SingleServerLogic";
const { getService } = require('port-numbers');

export default function SingleServer() {

    const location = useLocation(); // for screen navigation
    const { state } = location; // get props
    const [allPortList, setAllPortList] = useState([] as any[]); // tracks received ports
    let allPorts: string[]; // temporary variable for received ports

    // tracks if port lists are not empty
    const [allPortListHasData, setAllPortListHasData] = useState(Boolean)

    useEffect(() => {
        // get server traffic
        async function getTraffic() {
            allPorts = await getPortTrafficForAServer(state);
            setAllPortList(allPorts);
            if (allPortList.length >= 1) {
                setAllPortListHasData(true)
            } else {
                setAllPortListHasData(false)
            }
        }
        getTraffic();

    }, [allPortList]);
    
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
            console.log(payload)
            return (
                <div style={{
                    backgroundColor: 'white',
                    opacity: '0.9',
                    border: '1px solid black',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}>
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{"Packets Sent: " + `${payload[0].value}`}</p>
                    <p className="intro">{"Packets Received: " + `${payload[1].value}`}</p>
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
                <div className="white-div-for-single-server-title" style={{ minWidth: 1000, maxHeight: 80, marginLeft: "19.5%" }}> <h1 className='text-for-single-server-header' style={{ textAlign: "center"}}> Server {state} </h1></div>
                <div className="white-div" style={{ width: 1200, marginLeft: "10%" }}>
                    <div style={{ display: !allPortListHasData ? 'none' : '' }}>
                        <h3 style={{display: "inline-flex", textAlign: "center", marginLeft: "30%",  textDecoration: "underline" }}> Graph of Packets Sent and Received through Specific Ports </h3>
                        <BarChart height={500} width={1200} data={allPortList}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="port" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar name="Number Sent on Port" barSize={30} dataKey="numSent" fill="var(--orange_wheel)"> </Bar>
                            <Bar name="Number Received on Port" barSize={30} dataKey="numReceived" fill="var(--some_purple)" />
                        </BarChart>
                    </div>
                    <div style={{ display: allPortListHasData ? 'none' : '' }}>
                        {renderNoPortData()}
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}
