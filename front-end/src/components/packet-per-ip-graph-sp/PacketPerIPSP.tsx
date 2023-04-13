import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getClientServersByUser, getNumPacketsSentAndReceivedSP} from "./PacketPerIPSPLogic";


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

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            // @ts-ignore
            this.classList.toggle("active");
            // @ts-ignore
            var content = this.nextElementSibling;
            if (!content.style.display || content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }

    const render = () =>{

        return <>
            <button type="button" className="collapsible">{getGraphName()} Packet Traffic Graph</button>
            <div className="content">
                <BarChart height={500} width={1400} data={allPacketsPerIpSP}>
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
                </BarChart></div>
            <br/>
        </>

    }

    return (
       <div>
           {render()}
       </div>
    );
}