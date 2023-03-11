import ServerService from "../../requests/ServerService";
import UserService from "../../requests/UserService";

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
 * Get all clients that belong to a certain service provider
 * @returns all clients in database belonging to a specified service provider
 */
export async function getClientsByProvider(email: string){
    var clients = new Array();
    var res = await UserService.getUserByEmail(email);
    var userInfo = JSON.parse(res);

    interface Client {
        username: string;
        password: string;
        userType: string;
        userFirstName: string;
        userLastName: string;
        servers: {address: string}[];
        clients: [];
        enabled: boolean;
        credentialsNonExpired: boolean;
        accountNonExpired: boolean;
        accountNonLocked: boolean;
        authorities: boolean;
    }

    userInfo["clients"].forEach((client: Client) => {
        clients.push(client["username"]);
    });

    return clients;
}

/**
 * Get all servers that belong to a certain client
 * @returns list of all servers in database belonging to a specified client
 */
export async function getServersByClient(email: string){
    var servers = new Array();
    var res = await UserService.getUserByEmail(email);
    var userInfo = JSON.parse(res);

    userInfo["servers"].forEach((address: {address: string}) => {
        servers.push(address["address"]);
    });

    return servers;
}