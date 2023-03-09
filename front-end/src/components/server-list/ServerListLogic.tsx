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

/**
 * Get all servers that belong to a certain service provider
 * @returns all servers in database belonging to a specified service provider
 */
export async function getClientsByProvider(email: string){
    // TODO: will want to call getUserByEmail()
    // then return list of clients (see clients key in json)

    //var res = await ServerService.getAllServers();
    //return JSON.parse(res);
    return [];
}