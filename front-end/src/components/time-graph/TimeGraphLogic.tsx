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
    //Get all the sent packets for each server
    for (let j = 0; j < serverData.length; j++) {
        const obj = {time: serverData[j]["time"], address: serverData[j]["srcIP"]};
        //console.log(serverData[j]["time"]);
        sent_traffic.push(obj);        
    }
    //console.log("SENT TRAFFIC ARRAY");
    //console.log(sent_traffic);
    return sent_traffic;
}

/**
 * Function to get sent packet data
 * @param servers: list of servers
 * @param total_dict: dictionary of the form:
 * {address: string, time: string, count: number }
 * it is initially empty
 * @param time_vals: list of the time values that have sent packets
 * it is initially empty
 * @returns an array of the now filled total_dict and time_val elements
 */
export async function getSentPacketCounts(servers:any, total_dict:any, time_vals:any){
    for(let i = 0; i < servers.length; i++){
        let current_server = servers[i]["address"];
        var traffic = await getAllSentTraffic(current_server);

        //Count the number of packets sent for a specific time
        //and a specific server.
        var temp_dict:any = {};
        for(let x = 0, y = 0; x < traffic.length; x++){
            if(traffic[x]["address"] == current_server){
                var key = traffic[x]["time"];
                if(key in temp_dict){
                    temp_dict[key] = temp_dict[key] + 1;
                } else{
                    temp_dict[key] = 1;
                    var time_found = false;
                    for(let y = 0; y < time_vals.length; y++){
                        if(time_vals[y] == key){
                            time_found = true;
                        }
                    }
                    if(!time_found){
                        time_vals.push(key);
                    }
                }
            }       
        }

        // Add time and packet counts to a dictionary associated with the
        // servers addres.
        for(let i = 0; i < Object.keys(temp_dict).length; i++){
            var obj = {address: current_server, time: Object.keys(temp_dict)[i],
                        count: Object.values(temp_dict)[i]};
            //console.log(obj);
            total_dict.push(obj);
        }
    }
    var ret = [total_dict, time_vals];
    return ret;
}



export const TimeGraph = (data:any, server_names:any)=>{
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
    */
    
    //console.log(server_names);
    console.log("Data");
    console.log(data);
    console.log(data["server_names"][0]);

    return (
        <ResponsiveContainer width="100%" height="100%">
        <div>
            <LineChart
                width={500}
                height={300}
                data={data["data"]}
                margin={{top: 5, right: 30, left: 150, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="times" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={data["server_names"][0]} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={data["server_names"][1]} stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
        </ResponsiveContainer>

    );
    
    //return(<div> </div>);     
}