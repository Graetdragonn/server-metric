import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrafficService from "../../requests/TrafficService";
import UserService from "../../requests/UserService";

//https://recharts.org/en-US/examples
//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript


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
    var serverData = JSON.parse(server_traffic);
    var sent_traffic = [];
    //Get all the sent packets for each server
    for (let j = 0; j < serverData.length; j++) {
        const obj = {time: serverData[j]["time"], address: serverData[j]["srcIP"]};
        sent_traffic.push(obj);        
    }
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
export async function getSentPacketCounts(servers:any, total_dict:any){
    var time_vals = [];
    for(let i = 0; i < servers.length; i++){
        let current_server = servers[i]["address"];
        var traffic = await getAllSentTraffic(current_server);
        //Count the number of packets sent for a specific time
        //and a specific server.
        var temp_dict:any = {};
        for(let x = 0; x < traffic.length; x++){
            if(traffic[x]["address"] === current_server){
                var key = traffic[x]["time"];

                /* Potentially add an "if" statment here to verify
                 * the traffic is from the same dat
                 */

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
            total_dict.push(obj);
        }
    }
    return total_dict;
}

/**
 * Function to convert unix timestamp into time format.
 * @param unix_time 
 * @returns time
 */
function convertTime(unix_time: number){
    let millisec_time = new Date(unix_time * 1000);
    let hour_time = millisec_time.getHours();
    var time = hour_time;
    return time;
}

/**
 * Function to format the data into a form that the graph can read
 * @param time_vals: an array of unix time values
 * @param servers: an array of servers
 * @param total_dict: a dictionary of times, time counts, and servers
 * @returns data: a dictionary of formatted data
 */
export async function organizeData(servers:any, total_dict:any){
    var date = new Date();
    var afternoon = false;
    if(date.getHours() > 12){
        afternoon = true;
    }
    var data:any = [];
    var times =["1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00",
                "10:00","11:00","12:00"];
    for(let i = 0; i < times.length; i++){
        var dict_entry_string = '{"times": "';
        if(afternoon){
            dict_entry_string += times[i] + 'pm"';
        }if(!afternoon){
            dict_entry_string += times[i] + 'am"';
        }
        for(let j = 0; j < servers.length; j++){
            var time_found = false;
            for(let k = 0; k < total_dict.length; k++){
                var hour = convertTime(total_dict[k]["time"]);
                if(afternoon){
                    hour -= 12;
                }
                if((total_dict[k]["address"] == servers[j]["address"]) &&
                    ((i+1) == hour)){
                    dict_entry_string += ', "' + servers[j]["address"] + '":' + total_dict[k]["count"];
                    time_found = true;
                    break;
                }
            }
            if(!time_found){
                dict_entry_string += ', "' + servers[j]["address"] + '":0';
            }

        }
        dict_entry_string += '}'
        var data_obj = JSON.parse(dict_entry_string);
        data.push(data_obj);
    }
    return data;
}

/**
 * Dynamically rendering lines in the graph
 * @param serverList: list of servers
 * @returns An array of graph lines
 */
function renderLines(serverList:any){
    let returnArr = [];
    for(let i = 0; i < serverList.length; i++){
        var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        returnArr.push(<Line type="monotone" dataKey={serverList[i]} stroke={randomColor} activeDot={{ r: 8 }} />)
    }
    return returnArr;
}

export const TimeGraph = (data:any)=>{ 
    //console.log("Data");
    //console.log(data["data"]);
    //console.log(data["server_names"]);

    return (
        <ResponsiveContainer width="100%" height="100%">
        <div>
            <LineChart
                width={1300}
                height={540}
                data={data["data"]}
                margin={{top: 5, right: 30, left: 150, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="times" />
                <YAxis />
                <Tooltip />
                <Legend />
                
                {renderLines(data["server_names"])}

            </LineChart>
        </div>
        </ResponsiveContainer>

    );
    
}