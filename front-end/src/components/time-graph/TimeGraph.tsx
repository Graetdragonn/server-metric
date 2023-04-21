import React, {useState} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers} from "./TimeGraphLogic";
import { getAllSentTraffic } from "./TimeGraphLogic";

//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

const LineGraph = () => {
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
    
    // server list for user
   // const [serverList, setServerList] = useState([] as any[]);

    //Array to hold an array of time and address objects
    const serv_traffic = [] as any[];

    // get all servers
    const getServerTraffic = async () => {
        var servers = await getAllClientServers(email);
        //var serverList = JSON.parse(servers);
        console.log(servers);
        //var traffic_times = [];
        for(let i = 0; i < servers.length; i++){
            //console.log("Serverlist[i]  " + servers[i]["address"].toString());
            var traffic = getAllSentTraffic(servers[i]["address"]);
            serv_traffic.push(traffic);
        }
        console.log("Serv_traffic");
        console.log(serv_traffic);
        for(let i = 0; i < servers.length; i++){
            let current_server = servers[i]["address"];
            let time_idx = 0;
            let packet_counter = 0;
            for(let x = 0; x < serv_traffic.length; x++){
                if(serv_traffic[x]["time"] == serv_traffic[time_idx]["time"] &&
                    serv_traffic[x]["address"] == current_server){
                    packet_counter++;
                }
                
            }
        }
        //convertTimes(serv_traffic);
    }
    getServerTraffic();
    
    // const obj = {times: time[i], server1: values[i][j], server2: values[i][j+1]};
    function convertTime(unix_time: number){
        let millisec_time = new Date(unix_time * 1000);
        let hour_time = millisec_time.getHours();
        let minutes = "0" + millisec_time.getMinutes().toString();
        let seconds = "0" + millisec_time.getSeconds().toString();
        var time = hour_time + ':' + minutes + ':' + seconds;
        console.log(time);
        return time;
    }

    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph/>
        </div>
    );
}


export default LineGraph;
