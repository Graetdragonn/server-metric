import ServerService from "../../requests/ServerService";

/**
 * Get all servers
 * @returns all servers in database
 */
export async function getAllServers(){
    var res = await ServerService.getAllServers();
    return JSON.parse(res);
}

/**
 * Get server data by address
 * @param server server address
 * @returns server data
 */
export async function getServerInfo(server: string){
    const res = await ServerService.getServerByAddress(server);
    var serverData = JSON.parse(res);
    return serverData;
}