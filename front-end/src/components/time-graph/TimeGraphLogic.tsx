import React from 'react';
import {Line} from 'recharts';
import TrafficService from "../../requests/TrafficService";
import UserService from "../../requests/UserService";

//https://recharts.org/en-US/examples
//https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

/**
 * Get a list of servers for the user.
 * @param email user email
 */
export async function getAllClientServers(email:string){
    const clientInfo = await UserService.getUserByEmail(email);
    const clientData = JSON.parse(clientInfo);
    const servers = [];
    for (let j = 0; j < clientData["servers"].length; j++) {
        servers.push(clientData["servers"][j]);
    }
    return servers;
}

/**
 * Get all traffic from a server
 *
 */
export async function getAllTraffic(server: string){
    const res = await TrafficService.getAllTraffic();
    const trafficList = JSON.parse(res);
    const traffic = [];
    for(let i = 0; i < trafficList.length; i++){
        const receivedAddr = trafficList[i]["dstIP"];
        const sentAddr = trafficList[i]["srcIP"];
        if (server === sentAddr || server === receivedAddr ) {
            //consider converting time here to simplify code
            /*const obj = {time: trafficList[i]["time"], address: server};*/
            if(checkCurrentDate(trafficList[i]["time"])){
                const obj = {time: convertTime(trafficList[i]["time"]), address: server};
                traffic.push(obj);
            }
        }
    }
    return traffic;
}


/**
 * Function to check unix date with current date
 * @param unixTime
 * @returns boolean
 */
function checkCurrentDate(unixTime: number){
    let currentDate = new Date()
    let packetDate = new Date(unixTime * 1000);
    return currentDate.getDate() === packetDate.getDate();

}

/**
 * Function to get sent packet data
 * @param servers: list of servers
 * @param total_dict: dictionary of the form:
 * {address: string, time: string, count: number }
 * it is initially empty
 * it is initially empty
 * @returns an array of the now filled total_dict and time_val elements
 */
export async function getAllPacketCounts(servers:any, total_dict:any){
    const time_vals = [];
    for(let i = 0; i < servers.length; i++){
        let current_server = servers[i]["address"];
        const traffic = await getAllTraffic(current_server);
        //Count the number of packets sent for a specific time
        //and a specific server.
        const temp_dict: any = {};
        for(let x = 0; x < traffic.length; x++){
            if(traffic[x]["address"] === current_server){
                const key = traffic[x]["time"];

                    if(key in temp_dict){
                        temp_dict[key] = temp_dict[key] + 1;
                    } else{
                        temp_dict[key] = 1;
                        let time_found = false;
                        for(let y = 0; y < time_vals.length; y++){
                            if(time_vals[y] === key){
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
            const obj = {
                address: current_server, time: Object.keys(temp_dict)[i],
                count: Object.values(temp_dict)[i]
            };
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
    let time = new Date(unix_time * 1000);
    return time.getHours();
}

/**
 * Function to format the data into a form that the graph can read
 * @param servers: an array of servers
 * @param total_dict: a dictionary of times, time counts, and servers
 * @returns data: a dictionary of formatted data
 */
export async function organizeData(servers:any, total_dict:any){
    const date = new Date();
    let afternoon = false;
    if(date.getHours() > 12){
        afternoon = true;
    }
    const data: any = [];
    const times = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00",
        "10:00", "11:00", "12:00"];
    for(let i = 0; i < times.length; i++){
        let dict_entry_string = '{"times": "';
        if(afternoon){
            dict_entry_string += times[i] + 'pm"';
        }if(!afternoon){
            dict_entry_string += times[i] + 'am"';
        }
        for(let j = 0; j < servers.length; j++){
            let time_found = false;
            for(let k = 0; k < total_dict.length; k++){
                // let hour = convertTime(total_dict[k]["time"]);
                let hour = total_dict[k]["time"]
                if(afternoon){
                    hour -= 12;
                }
                if((total_dict[k]["address"] == servers[j]["address"]) && ((i+1) == hour)){
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
        const data_obj = JSON.parse(dict_entry_string);
        data.push(data_obj);
    }
    return data;
}

/**
 * @function to get a color for a line in the graph
 * @param i
 */
function getColor(i: any){
    let colorArr = ["#EE8434","#7353BA", "#EF476F", "#12355b", "#65a48f", "#bb4430", "#A5FFD6", "#EEFC57", "#D0CFEC", "#9BC53D"]
    while(i >= colorArr.length){
        i = i - colorArr.length
    }
    return colorArr[i]
}

/**
 * Dynamically rendering lines in the graph
 * @param serverList: list of servers
 * @returns An array of graph lines
 */
export function renderLines(serverList:any){
    let returnArr = [];
    for(let i = 0; i < serverList.length; i++){
        returnArr.push(<Line type="monotone" dataKey={serverList[i]} stroke={getColor(i)} activeDot={{ r: 8 }} />)
    }
    return returnArr;
}