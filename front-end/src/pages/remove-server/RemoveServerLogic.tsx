import ServerService from '../../requests/ServerService';
import UserService from '../../requests/UserService';

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
 * Add server to server list
 * @param server server address
 * @returns true if success, false otherwise
 */
export async function removeServerFromList(server: string): Promise<boolean> {
    var addServer = await ServerService.deleteFromServerList(server);
    if(addServer === ''){
        return false; 
    }
    return true;
}

/**
 * Add server to user's list
 * @param email user email
 * @param server server address
 * @returns true if success, false otherwise
 */
export async function removeServerFromUser(email: string, server: string): Promise<boolean> {
    var addServer = await UserService.removeServerFromUser(email, server);
    if(addServer === ''){
        return false; 
    }
    return true;
}
