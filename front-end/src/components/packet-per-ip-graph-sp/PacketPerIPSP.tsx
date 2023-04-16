import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getClientServersByUser, getNumPacketsSentAndReceivedSP} from "./PacketPerIPSPLogic";
import Collapsible from 'react-collapsible';


interface PacketPerIPSPComponentProps {
    clientEmail: string;
    clientFullName: string;
    subnetAddress: string;
}

export default function PacketPerIPSP({clientEmail, clientFullName, subnetAddress}: PacketPerIPSPComponentProps) {
    // track sent and received packets per IP - service provider
    const [allPacketsPerIpSP, setAllPacketsPerIpSP] = useState([] as any[]);
    let clientWithServersList: string[]; // user info

    // sent and received packets per service provider's clients
    let allPacketsPerSP: any[];

    const navigate = useNavigate(); // for screen navigation

    useEffect(() => {
        const getData = async () => {
            const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
            clientWithServersList = await getClientServersByUser(email); //list of SP client's and the list of their server
            allPacketsPerSP = await getNumPacketsSentAndReceivedSP(clientWithServersList, clientEmail, subnetAddress);
            setAllPacketsPerIpSP(allPacketsPerSP);
        }
        getData()
    }, [])


    function getGraphName(){
        return clientFullName + ": Subnet: " + subnetAddress
    }

    function render(){
        return <>
            <Collapsible trigger={getGraphName()} transitionTime={100}>
                <div style={{width: "100%", height: 600}}>
                    <br/>
                    <ResponsiveContainer className="content">
                <BarChart margin={{top: 30, right: 100, left: 0, bottom: 30}} height={500} width={1400} data={allPacketsPerIpSP}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis name="Address" dataKey="address"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar onClick={(data) => {
                        navigate("/single-server", {state: data.address});
                    }} name="Number of Packets Sent" barSize={30} dataKey="sentPackets" fill="var(--orange_wheel)"/>
                    <Bar onClick={(data) => {
                        navigate("/single-server", {state: data.address});
                    }} name="Number of Packets Received" barSize={30} dataKey="receivedPackets"
                         fill="var(--some_purple)"/>
                </BarChart>
                        </ResponsiveContainer>
            </div>
                </Collapsible>
            <br/>
        </>
    }

    return (
       <div>
           {render()}
       </div>
    );
}