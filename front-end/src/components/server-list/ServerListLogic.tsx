import ServerService from "../../requests/ServerService";
import UserService from "../../requests/UserService";

interface Client {
    username: string;
    password: string;
    userType: string;
    userFirstName: string;
    userLastName: string;
    servers: {address: string}[];
    clients: Client[];
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: boolean;
  }

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
 * Get user by email
 * @param user email
 * @returns user data
 */
export async function getUserByEmail(email: string){
    var res = await UserService.getUserByEmail(email);
    var userData = JSON.parse(res);
    return userData;
}

/**
 * Get all clients that belong to a certain service provider
 * @returns all clients in database belonging to a specified service provider
 */
export async function getClientsByProvider(userInfo: Client){
    var clients = new Array();

    if (userInfo["clients"] != null) {
        userInfo["clients"].forEach((client: Client) => {
            clients.push(client["username"]);
        });
    }

    return clients;
}
