import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getNumPacketsSentAndReceivedClient, getServersByUser} from "./PacketPerIPClientLogic";
import Collapsible from "react-collapsible";


interface PacketPerIPClientComponentProps {
    subnetAddress: string;
}

export default function PacketPerIPClient({subnetAddress}: PacketPerIPClientComponentProps) {
    // track sent and received packets per IP - client
    const [allPacketsPerIpClient, setAllPacketsPerIpClient] = useState([] as any[]);
    let [posData, setPosData] = useState({} as any);
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

            <Collapsible  trigger={getGraphName()} transitionTime={100}>
                <div style={{width: "100%", height: 600}}>
                    <br/>
            <ResponsiveContainer className="content">
                <BarChart margin={{top: 30, right: 100, left: 0, bottom: 30}} height={500} width={1400} data={allPacketsPerIpClient}>
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
                         fill="var(--some_purple)"
                    />
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