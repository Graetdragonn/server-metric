import TrafficService from "../../requests/TrafficService";
import ServerService from "../../requests/ServerService";
import { getUserByEmail } from "../server-list/ServerListLogic";
import { ServerAndStatus } from "./ServerStatus";
import * as Constants from "../../constants";
import emailjs from '@emailjs/browser';

/**
 * Get servers belonging to user email (adapted from getClientsServers in ServerListLogic.tsx)
 * @param user email
 * @returns list of servers
 */
export async function getUserServers(email: string) {
    var servers = [];
    var clientInfo = await getUserByEmail(email);
    for (let i = 0; i < clientInfo["servers"].length; i++) {
        servers.push(clientInfo["servers"][i]["address"]);
    }
    return servers;
}

/**
 * Returns name (if available) and subnet (taken from TimeGraph.tsx, function not in logic file)
 * @param clientName client first and last name
 * @param subnetAddress 
 * @returns string with name (if available) and subnet address
 */
export function getName(clientName: string, subnetAddress: string){
    if (clientName !== "") {
        return clientName + ", Subnet: " + subnetAddress
    } else {
        return "Subnet: " + subnetAddress
    }
}

/**
 * Returns an array of only the servers within the specified subnet
 * @param servers list of all servers
 * @param subnetAddress subnet address to match
 * @returns list of servers within the subnetAddress
 */
export function getServersInSubnet(servers: any[], subnetAddress: string){
    var serversInSubnet = [] as string[];
    for (var i = 0; i < servers.length; i++) {
        if (subnetAddress === getSubnetFromFullAddress(servers[i])) {
            serversInSubnet.push(servers[i]);
        }
    };
    return serversInSubnet;
}

/**
 * Checks whether the server is down or up
 * @param address server to check
 * @returns "DOWN" or "UP"
 */
export async function checkServerStatus(address: string) {
    var latestTraffic = parseInt(await TrafficService.getLatestTrafficByAddress(address));
    var currentTime = new Date().getTime();

    if (latestTraffic == null) { 
        return "Error getting most recent traffic." 
    }
    return ((currentTime - Constants.TIME_UNTIL_SERVER_DOWN) > latestTraffic) ? "DOWN" : "UP";
}

/**
 * Constructs the server status text to display on screen
 * @param serversWithStatus array of objects containing the server and its status (see interface on ServerStatus.tsx)
 * @returns 
 */
export function renderServerList(serversWithStatus: any[], email: string) {
    var returning = [] as any[];
    serversWithStatus.forEach((item: ServerAndStatus, index: number) => {
        var statusColor = "black";
        if (item["status"] === "UP") {
            statusColor = "green";
        } else if (item["status"] === "DOWN") {
            statusColor = "red";
            sendServerDownEmail(item["server"], email);
        }
        returning.push(<div key={index}>Server {item["server"]} is <span style={{ color: statusColor }}>{item["status"]}</span></div>)
    });
    return returning;
};

/**
 * Send user an email about their server being down
 * @param server  address of server that is down
 * @param email   email of user
 */
function sendServerDownEmail(server: string, email: string) {
    const templateParams = {
        to_email: email,
        server_down: server,
        elapsed_time: millisecondsToHours(Constants.TIME_UNTIL_SERVER_DOWN) + " hours"
    }
    // console.log("Sending 'server " + server + " down' email to " + email);

    // DO NOT UNCOMMENT THE FOLLOWING LINES. EMAIL WILL SEND.

    // emailjs.send(Constants.EMAIL_SERVICE_ID, Constants.SERVER_DOWN_EMAIL_TEMPLATE_ID, templateParams, Constants.PUBLIC_KEY)
    // .then((result) => {
    //     //console.log(result.text);
    // }, (error) => {
    //     //console.log(error.text);
    // });
}

/**
 * Parses the subnet from the full server address
 * @param fullAddress 
 * @returns subnet
 */
function getSubnetFromFullAddress(fullAddress: string){
    var regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    // @ts-ignore
    return fullAddress.match(regExp).toString()
}

/**
 * Converts milliseconds to hours
 * @param time in milliseconds 
 * @returns time in hours
 */
function millisecondsToHours(milliseconds: number) {
    return (milliseconds / 1000 / 60 / 60);
}