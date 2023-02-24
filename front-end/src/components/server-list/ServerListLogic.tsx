import ServerService from "../../requests/ServerService";

/**
 * Get all servers
 * @returns all servers in database
 */
export async function getAllServers(){
    var res = await ServerService.getAllServers();
    return JSON.parse(res);
}