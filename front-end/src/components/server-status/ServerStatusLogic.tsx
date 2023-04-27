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

export function getServersFromSubnet(servers: any[], subnet: string) {
    servers.forEach((subnetAndFullIP: {firstThree: string, addresses: [address: string]}) => {
        if (subnetAndFullIP["firstThree"] === subnet) {
            console.log("TO RETURN: ", subnetAndFullIP["addresses"]);
            return subnetAndFullIP["addresses"];
        }
    });
    console.log("HERE");
    return [];
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

export function renderServerList(serverList: any[], subnetAddress: string) {
    var returning = [] as any[];
    // serverList.forEach((subnetAndFullIP: {firstThree: string, addresses: string[]}, index: number) => {
    //     if (subnetAndFullIP["firstThree"] === subnetAddress) {
    //         subnetAndFullIP["addresses"].map((address: string) => {
    //             return(
    //                 returning.push(<div key={index}>Server {address}: {checkServerStatus(address)}</div>)
    //             )
    //         });
    //     }
    // });
    return returning;
};

function checkServerStatus(address: string) {
    return "UP";
}
