import ServerService from "../../requests/ServerService";
import { getUserByEmail } from "../server-list/ServerListLogic";

/**
 * Get servers belonging to user email (adapted from getClientsServers in ServerListLogic.tsx)
 * @param user email
 * @returns list of servers
 */
export async function getUserServers(email: string) {
    var servers = new Array({ address: String });
    var clientInfo = await getUserByEmail(email);
    for (let j = 0; j < clientInfo["servers"].length; j++) {
        servers.push(clientInfo["servers"][j]);
    }
    return servers;
}

export function getName(clientName: string, subnetAddress: string){
    if (clientName != "") {
        return clientName + ", Subnet: " + subnetAddress
    } else {
        return "Subnet: " + subnetAddress
    }
}


// // if statement for checking if address goes in subnet
// if(getSubnetFromFullAddress(clientAndServersAndPackets[i]["servers"][j]) == subnetAddress){
//     returnList.push({ address: clientAndServersAndPackets[i]["servers"][j], sentPackets: clientAndServersAndPackets[i]["sentPackets"][j], receivedPackets: clientAndServersAndPackets[i]["receivedPackets"][j]})
// }