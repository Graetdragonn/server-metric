import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getClientServersByUser, getNumPacketsSentAndReceivedSP} from "./PacketPerIPSPLogic";


export default function PacketPerIPSP() {
    // track sent and received packets per IP - service provider
    const [allPacketsPerIpSP, setAllPacketsPerIpSP] = useState([] as any[]);
    const [clientNames, setClientNames] = useState([] as any[]); // get clients' names

    let userInfo: string[]; // user info

    // sent and received packets per service provider's clients
    let allPacketsPerSP: any[];

    const navigate = useNavigate(); // for screen navigation


    const getData = async () => {
        const email = localStorage.getItem("email")!.substring(1, localStorage.getItem("email")!.length - 1);
        userInfo = await getClientServersByUser(email);
        setClientNames(userInfo);
        allPacketsPerSP = await getNumPacketsSentAndReceivedSP(clientNames);
        setAllPacketsPerIpSP(allPacketsPerSP);
    }

    // get address from user and server
    const getAddressFromUserAndAddress = (userAndAddress: string) => {
        return userAndAddress.substring(userAndAddress.indexOf(' ') + 1);
    }

    const render = () =>{
        getData()
        return  <BarChart height={500} width={1400} data={allPacketsPerIpSP}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis name="Client and Address" dataKey="userAndAddress" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number of Packets Sent" barSize={30} dataKey="sentPackets" fill = "var(--orange_wheel)" />
            <Bar onClick={(data) => { navigate("/single-server", { state: getAddressFromUserAndAddress(data.userAndAddress) }) }} name="Number of Packets Received" barSize={30} dataKey="receivedPackets" fill= "var(--some_purple)" />
        </BarChart>

    }

    return (
       <div>
           {render()}
       </div>
    );
}