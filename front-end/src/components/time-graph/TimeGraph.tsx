import React, {useState, useEffect} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers, getAllPacketCounts, organizeData} from "./TimeGraphLogic";
import Collapsible from "react-collapsible";
import {ResponsiveContainer} from "recharts";


export default function LineGraph(){
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
    const[data, setData] = useState([] as any[]);
    const[serverNames, setServerNames] = useState([] as any[]);
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    // Get all servers traffic
    //const getServerTraffic = async () => {
    useEffect(() => {
        async function getData(){
            const globalServers: any = [];
            // Get servers
            const servers = await getAllClientServers(email);
            for(let i = 0; i < servers.length; i++){
                globalServers.push(servers[i]["address"]);
            }
            setServerNames(globalServers);
            // Get traffic for each server
            let total_dict: any = [];
            total_dict = await getAllPacketCounts(servers, total_dict);

            // Sort the data by time and reformat it such that it follows below:
            // {times: time, server1: packet_count, server2: packet_count... etc.}
            const data1 = await organizeData(servers, total_dict);
            setData(data1);
        }
        getData();
        setTimeout(() => setCurrentTime(new Date()), 10000)
    }, [currentTime]);

    return (
        <Collapsible  trigger={"Packets Sent Over Time"} transitionTime={100}>
            <ResponsiveContainer className={"content"}>
        <div style={{fontWeight: "normal", marginTop: 30, marginBottom: 20}}>
            <TimeGraph data={data} server_names={serverNames}/>
        </div>
            </ResponsiveContainer>
        </Collapsible>
    );
}


