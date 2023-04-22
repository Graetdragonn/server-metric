import React, {useState} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers, getSentPacketCounts} from "./TimeGraphLogic";
import { getAllSentTraffic } from "./TimeGraphLogic";

//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

/*
type props = {
    data: any[],
    servers: string[]
}
*/



const LineGraph = () => {
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
   // var servers:any = [];

    // Get all servers traffic
    const getServerTraffic = async () => {
        // Get servers
        var servers = await getAllClientServers(email);
        // Get traffic for each server
        var total_dict:any = [];
        var time_vals:any = [];
        var ret:any = await getSentPacketCounts(servers, total_dict, time_vals);
        total_dict = ret[0];
        time_vals = ret[1];
        // Ensure time data is in sorted order
        time_vals.sort();
        //console.log(time_vals);
        //console.log(total_dict);

        // Sort the data by time and reformat it such that it follows below:
        // {times: time, server1: packet_count, server2: packet_count... etc.}
        for(let i = 0; i < time_vals.length; i++){
            var dict_entry_string = "times: " + time_vals[i];
            for(let j = 0; j < servers.length; j++){
                for(let k = 0; k < total_dict.length; k++){
                    if((total_dict[k]["address"] == servers[j]) &&
                        (time_vals[i] == total_dict[k]["time"])){
                        dict_entry_string += ", " + servers[j] + ":" + total_dict[k]["count"];
                    }else{
                        dict_entry_string += ", " + servers[j] + ":0";
                    }
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

    var data:any = [{times: "1", "192.168.0.3": 5, "168.103.11.2": 2},
                    {times: "2", "192.168.0.3": 8, "168.103.11.2": 3},
                    {times: "3", "192.168.0.3": 9, "168.103.11.2": 8}];

    var servers = ["192.168.0.3", "168.103.11.2"];

    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph data={data} server_names={servers}/>
        </div>
    );
}


export default LineGraph;
