import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getNumPacketsSentAndReceivedClient, getServersByUser} from "./PacketPerIPClientLogic";


interface PacketPerIPClientComponentProps {
    subnetAddress: string;
}

export default function PacketPerIPClient({subnetAddress}: PacketPerIPClientComponentProps) {
    // track sent and received packets per IP - client
    const [allPacketsPerIpClient, setAllPacketsPerIpClient] = useState([] as any[]);

    let userInfo: string[]; // user info

    const navigate = useNavigate(); // for screen navigation

    // sent and received packets per client
    let allPacketsPerClient: any[];

    useEffect(() => {
        async function getData() {
            const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
            userInfo = await getServersByUser(email);
            allPacketsPerClient = await getNumPacketsSentAndReceivedClient(userInfo, subnetAddress);
            setAllPacketsPerIpClient(allPacketsPerClient);
        }
        getData()
    }, [])




    function getGraphName(){
        return "Servers on Subnet: " + subnetAddress
    }

    function render(){
        return <>
            <button type="button" className="collapsible">{getGraphName()}</button>
            <div className="content">
            <BarChart height={500} width={1400} data={allPacketsPerIpClient}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="address"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar onClick={(data) => {
                    navigate("/single-server", {state: data.address});
                }} name="Number of Packets Sent" barSize={30} dataKey="numPacketsSent" fill="var(--orange_wheel)"/>
                <Bar onClick={(data) => {
                    navigate("/single-server", {state: data.address});
                }} name="Number of Packets Received" barSize={30} dataKey="numPacketsReceived"
                     fill="var(--some_purple)"/>
            </BarChart>
            </div>
            </>

    }

    return (
        <div>
            {render()}
        </div>

    );
}