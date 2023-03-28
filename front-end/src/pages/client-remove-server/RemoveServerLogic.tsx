import ServerService from '../../requests/ServerService';
import UserService from '../../requests/UserService';
import {getUserByEmail } from "../../components/server-list/ServerListLogic";

/**
 * Checks server address format
 * @param server server address
 * @returns true if address is in correct format, else otherwise
 */
export function checkServerFormat(server: string): boolean {
    let re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (re.test(server)) {
        return true;
    }
    return false;
}

/**
 * Checks if server exists in server list
 * @param server server address
 * @returns true if server already exists, false otherwise
 */
export async function checkIfExists(server: string): Promise<boolean> {
    var getServer = await ServerService.getServerByAddress(server);
    if(getServer === 'null'){
        return false; 
    }
    return true;
}

/**
 * Remove server from server list
 * @param server server address
 * @returns true if success, false otherwise
 */
export async function removeServerFromList(server: string): Promise<boolean> {
    var removeServer = await ServerService.deleteFromServerList(server);
    if(removeServer === ''){
        return false; 
    }
    return true;
}

/**
 * Remove server from user's list
 * @param email user email
 * @param server server address
 * @returns true if success, false otherwise
 */
export async function removeServerFromUser(email: string, server: string): Promise<boolean> {
    var removeServer = await UserService.removeServerFromUser(email, server);
    if(removeServer === ''){
        return false; 
    }
    return true;
}

/**
 * Get a list of servers for the user.
 * @param email user email
 */
export async function getAllClientServers(email:string){
    var clientInfo = await getUserByEmail(email);
    var servers = [];
    for (let j = 0; j < clientInfo["servers"].length; j++) {
        servers.push(clientInfo["servers"][j]);
    }
    return servers;
}
