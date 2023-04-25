import React, {useState, useEffect} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers, getSentPacketCounts, organizeData} from "./TimeGraphLogic";
//import { getAllSentTraffic } from "./TimeGraphLogic";

//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript


const LineGraph = () => {
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
    const[data, setData] = useState([] as any);
    const[servers_name, set_servers_name] = useState([] as any);
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    // Get all servers traffic
    //const getServerTraffic = async () => {
    useEffect(() => {
        async function getData(){
            var globalServers:any = [];
            // Get servers
            var servers = await getAllClientServers(email);
            for(let i = 0; i < servers.length; i++){
                globalServers.push(servers[i]["address"]);
            }
            set_servers_name(globalServers);
            // Get traffic for each server
            var total_dict:any = [];
            total_dict = await getSentPacketCounts(servers, total_dict);

            // Sort the data by time and reformat it such that it follows below:
            // {times: time, server1: packet_count, server2: packet_count... etc.}
            var data1 = await organizeData(servers, total_dict);
            setData(data1);
        }
        getData();
        setTimeout(() => setCurrentTime(new Date()), 10000)
    }, [currentTime]);
    
    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph data={data} server_names={servers_name}/>
        </div>
    );
}


export default LineGraph;
