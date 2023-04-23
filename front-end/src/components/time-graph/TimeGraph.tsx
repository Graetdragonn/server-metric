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
            var time_vals:any = [];
            var ret:any = await getSentPacketCounts(servers, total_dict, time_vals);
            total_dict = ret[0];
            time_vals = ret[1];
            // Ensure time data is in sorted order
            time_vals.sort();

            // Sort the data by time and reformat it such that it follows below:
            // {times: time, server1: packet_count, server2: packet_count... etc.}
            var data1 = await organizeData(time_vals, servers, total_dict, data);
            setData(data1);
        }
        getData();
    }, []);
    
    // const obj = {times: time[i], server1: values[i][j], server2: values[i][j+1]};
    /*
    function convertTime(unix_time: number){
        let millisec_time = new Date(unix_time * 1000);
        let hour_time = millisec_time.getHours();
        let minutes = "0" + millisec_time.getMinutes().toString();
        let seconds = "0" + millisec_time.getSeconds().toString();
        var time = hour_time + ':' + minutes + ':' + seconds;
        console.log(time);
        return time;
    }
    */

    var data2:any = [{times: "1", "192.168.0.3": 5, "168.103.11.2": 2},
                    {times: "2", "192.168.0.3": 8, "168.103.11.2": 3},
                    {times: "3", "192.168.0.3": 9, "168.103.11.2": 8}];



    var servers_name2 = ["192.168.0.3", "168.103.11.2"];
   // var data3 = {data2, servers_name2}
   //server_names={servers_name}
    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph data={data} server_names={servers_name}/>
        </div>
    );
}


export default LineGraph;
