import React, {useState} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers} from "./TimeGraphLogic";
import { getAllSentTraffic } from "./TimeGraphLogic";

const LineGraph = () => {
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
    console.log(email);
    
    // server list for user
   // const [serverList, setServerList] = useState([] as any[]);
    //const serverList = [];

    // get all servers
    const getServerTraffic = async () => {
        var servers = await getAllClientServers(email);
        //var serverList = JSON.parse(servers);
        console.log(servers);
        var traffic_times = [];
        for(let i = 0; i < servers.length; i++){
           // const obj = {times: time[i], server1: values[i][j], server2: values[i][j+1]};
            console.log("Serverlist[i]  " + servers[i]["address"].toString());
            var traffic = getAllSentTraffic(servers[i]["address"]);
            traffic_times.push(traffic);
        }
        console.log("TRAFFIC TIMES");
        console.log(traffic_times)
    }
    getServerTraffic();
    


    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph/>
        </div>
    );
}


export default LineGraph;
