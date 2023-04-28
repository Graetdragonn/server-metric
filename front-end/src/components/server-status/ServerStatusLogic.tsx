import TrafficService from "../../requests/TrafficService";
import { getUserByEmail } from "../server-list/ServerListLogic";
import * as Constants from "../../constants";

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
 * Constructs the server status text to display on screen
 * @param serversWithStatus array of objects containing the server and its status (see interface on ServerStatus.tsx)
 * @returns 
 */
export function renderServerList(serversWithStatus: any[]) {
    var returning = [] as any[];
    serversWithStatus.forEach((item: {server: string, status: string}, index: number) => {
        var statusColor = "black";
        if (item["status"] === "UP") {
            statusColor = "green";
        } else if (item["status"] === "DOWN") {
            statusColor = "red";
        }
        returning.push(<div key={index}>Server {item["server"]} is <span style={{ color: statusColor }}>{item["status"]}</span></div>)
    });
    console.log(returning);
    return returning;
};

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
 * Parses the subnet from the full server address
 * @param fullAddress 
 * @returns subnet
 */
function getSubnetFromFullAddress(fullAddress: string){
    var regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    // @ts-ignore
    return fullAddress.match(regExp).toString()
}