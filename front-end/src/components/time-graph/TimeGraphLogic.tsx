import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrafficService from "../../requests/TrafficService";
import UserService from "../../requests/UserService";

//https://recharts.org/en-US/examples


/**
 * Get a list of servers for the user.
 * @param email user email
 */
export async function getAllClientServers(email:string){
    var clientInfo = await UserService.getUserByEmail(email);
    var clientData = JSON.parse(clientInfo);
    var servers = [];
    for (let j = 0; j < clientData["servers"].length; j++) {
        servers.push(clientData["servers"][j]);
    }
    return servers;
}

/**
 * Get all traffic sent from a server
 * @param address of server
 */
export async function getAllSentTraffic(address: string){
    var server_traffic = await TrafficService.getAllSentTrafficByServer(address);
    //console.log("SERVERDATA")
    //console.log(server_traffic);
    var serverData = JSON.parse(server_traffic);
    //console.log(serverData);
    var sent_traffic = [];
    for (let j = 0; j < serverData.length; j++) {
        const obj = {time: serverData[j]["time"], address: serverData[j]["srcIP"]};
        //console.log(serverData[j]["time"]);
        sent_traffic.push(obj);        
    }
    console.log("SENT TRAFFIC ARRAY");
    console.log(sent_traffic);
    return sent_traffic;
}



export const TimeGraph = ()=>{
    //time: string[]
    //values: number[][]
    //server_names: string[]
   // var servers = getAllClientServers(email);
    //console.log(servers);


    /*
    var data : any = [];    
    var i = 0;
    var j = 0;
    for(i = 0; i < time.length; i++){
        const obj = {times: time[i], server1: values[i][j], server2: values[i][j+1]};
        data.push(obj);
    }
    
    //console.log(servers);
    //console.log("Data");
    //console.log(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{top: 5, right: 30, left: 150, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="times" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={server_names[0]} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={server_names[1]} stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
        </ResponsiveContainer>

    );
    */
    return(<div> </div>);     
}