import { useLocation } from "react-router-dom";
import '../../style/Master.css';
import NavBar from "../../components/navigation-bar/NavBar";
import React, {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getPortTrafficForAServer,} from "./SingleServerLogic";
import SingleServerTimeGraph from "../../components/single-server-time-graph/SingleServerTimeGraph";
import WorldMap from "../../components/world-map/WorldMap";
const { getService } = require('port-numbers');

export default function SingleServer() {

    const location = useLocation(); // for screen navigation
    const { state } = location; // get props
    const [allPortList, setAllPortList] = useState([] as any[]); // tracks received ports
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want
    let allPorts: string[]; // temporary variable for received ports

    useEffect(()=>{
        async function getData() {
            allPorts = await getPortTrafficForAServer(state);
            setAllPortList(allPorts);
        }

        setTimeout(() => setCurrentTime(new Date()), 10000)
        getData()
    }, [currentTime])


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
                    <p className="intro">{"Packets Sent: " + `${payload[0].value}`}</p>
                    <p className="intro">{"Packets Received: " + `${payload[1].value}`}</p>
                    <p className="intro">{getPortName(label)}</p>
                    <p className="intro">{getPortDescription(label)}</p>
                </div>
            );
        }

        return null;
    };

    const render = () =>{
        return <>

            <div className={"div-for-graphs"}>
                <h3 style={{textAlign: "center", color: "var(--better_black)"}}>Graph of Packets Sent and Received through Specific Ports</h3>
                <BarChart height={500} width={1400} data={allPortList}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="port" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar name="Number Sent on Port" barSize={30} dataKey="numSent" fill="var(--orange_wheel)"> </Bar>
                <Bar name="Number Received on Port" barSize={30} dataKey="numReceived" fill="var(--some_purple)" />
                </BarChart>
            </div>
            </>
    }


    return (
        <div className="Single-Server-Page">

            <NavBar />

            <br/>
            <br/>
            <h1 style={{textAlign: "center", color:  "var(--better_black)"}}>Server: {state}</h1>

            <br/>
            <br/>

            {render()}

            <br/>
            <br/>
            <br/>

            <WorldMap server={state} />

            <br/>
            <br/>
            <br/>

            <SingleServerTimeGraph address={state}></SingleServerTimeGraph>

            <br/>
            <br/>

        </div>

    );
}
