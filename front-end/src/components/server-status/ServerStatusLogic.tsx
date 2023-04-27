import ServerService from "../../requests/ServerService";
import { getUserByEmail } from "../server-list/ServerListLogic";

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
    if (clientName != "") {
        return clientName + ", Subnet: " + subnetAddress
    } else {
        return "Subnet: " + subnetAddress
    }
}

export function getServersInSubnet(servers: any[], subnetAddress: string){
    var serversInSubnet = [] as string[];
    for (var i = 0; i < servers.length; i++) {
        if (subnetAddress === getSubnetFromFullAddress(servers[i])) {
            serversInSubnet.push(servers[i]);
        }
    };
    return serversInSubnet;
}

export function renderServerList(serverList: any[]) {
    var returning = [] as any[];
    serverList.forEach((address: string, index: number) => {
        returning.push(<div key={index}>Server {address} is {checkServerStatus(address)}</div>)
    });
    return returning;
};

function checkServerStatus(address: string) {
    return "UP";
}

function getSubnetFromFullAddress(fullAddress: string){
    var regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    // @ts-ignore
    return fullAddress.match(regExp).toString()
}