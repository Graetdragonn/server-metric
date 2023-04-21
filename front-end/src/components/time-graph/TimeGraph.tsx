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

    // get all servers
    const getServerTraffic = async () => {
        var servers = await getAllClientServers(email);
        //const serv_traffic = [] as any[];
        //var serverList = JSON.parse(servers);
        //console.log(servers);
        //var traffic_times = [];
        /*
        for(let i = 0; i < servers.length; i++){
            //console.log("Serverlist[i]  " + servers[i]["address"].toString());
            var traffic = getAllSentTraffic(servers[i]["address"]);
            serv_traffic.push(traffic);
        }
        */
        //console.log("Serv_traffic");
        //console.log(serv_traffic);
        //Count the packets sent for each server at specified time.
        //time_dict{server_address, time{time, count}}
        var total_dict:any = [];
        for(let i = 0; i < servers.length; i++){
            let current_server = servers[i]["address"];
            var traffic = await getAllSentTraffic(current_server);
            var temp_dict:any = {}
            for(let x = 0, y = 0; x < traffic.length; x++){
                if(traffic[x]["address"] == current_server){
                    var key = traffic[x]["time"];
                    if(key in temp_dict){
                        temp_dict[key] = temp_dict[key] + 1;
                    } else{
                        temp_dict[key] = 1;
                    }
                }       
            }
            //console.log("DICTIONARY + " + current_server);
           // console.log(temp_dict);
            //console.log("TEMP_DICT[0].key");
            //console.log(Object.keys(temp_dict)[0]);
            //console.log(Object.values(temp_dict)[0]);
            console.log(Object.keys(temp_dict).length);
            for(let i = 0; i < Object.keys(temp_dict).length; i++){
                var obj = {address: current_server, time: Object.keys(temp_dict)[i],
                            count: Object.values(temp_dict)[i]};
                console.log(obj);
                total_dict.push(obj);
            }
        }
        console.log(total_dict);
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
